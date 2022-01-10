import { html, LitElement } from 'lit';
import { customElement, query, state } from 'lit/decorators.js';
import { live } from 'lit/directives/live.js'
import '@material/mwc-textfield'
import '@material/mwc-button'
import '@material/mwc-icon-button'
import { globalStyles } from '../global-styles';
import { Jobsite } from '../types';
import './jobsite-edit-dialog'
import './jobsite-information-dialog'


@customElement('jobsites-view')
export class JobsitesView extends LitElement {
  @state()
  private query: string = '';

  static styles = [
    globalStyles
  ]

  render() {

    // Here we should filter the results with the query
    const jobsites = window.dataManager.jobsites.filter(j => {
      if (!this.query) { return true }

      if (j.name.indexOf(this.query) >= 0 ) return true;
      if (j.type.indexOf(this.query) >= 0 ) return true;
      if (j.url.indexOf(this.query) >= 0 ) return true;
      if (j.phone.indexOf(this.query) >= 0 ) return true;
      if (j.note.indexOf(this.query) >= 0 ) return true;
    })

    return html`
    <mwc-textfield type=search
      icon=search
      value=${this.query}
      @keyup=${e=>this.query=e.target.value}></mwc-textfield>

    ${jobsites.map(j=>html`
    <div class="flex strip"
      @click=${()=>window.jobsiteInformationDialog.open(j)}>${j.name}</div>`
    )}

    <div style="text-align:center;margin:12px;">
      <mwc-button unelevated icon="add" @click=${() => this.addJobsite()}>jobsite</mwc-button>
    </div>
    `
  }

  public async editJobsite (type: 'add'|'edit', jobsite: Jobsite) {
    try {
      await window.jobsiteEditDialog.open(type, jobsite)

      window.app.updateViews()

      // save remote
      window.dataManager.saveRemote()

      // return returned;
    }
    catch (e) {
      console.log('cancelled')
      throw e
    }
  }

  private async addJobsite () {
    // Create a new jobsite object
    // or recycle the one in the edit dialog if one
    let jobsite
    if (window.jobsiteEditDialog.type === 'add' && window.jobsiteEditDialog.jobsite) {
      jobsite = window.jobsiteEditDialog.jobsite
    }
    else {
      jobsite = window.dataManager.constructJobsite()
    }

    // add the jobsite in the database
    window.dataManager.addJobsite(jobsite)

    try {
      await this.editJobsite('add', jobsite)

      // reset dialog when success
      window.jobsiteEditDialog.reset()
    }
    catch (e) {
      // If cancelled we need to remove the item from the database
      window.dataManager.removeJobsite(jobsite)
    }
  }
}