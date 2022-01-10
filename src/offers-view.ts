import { html, LitElement } from 'lit';
import { customElement, query, state } from 'lit/decorators.js';
import { live } from 'lit/directives/live.js'
import '@material/mwc-textfield'
import '@material/mwc-button'
import { globalStyles } from './global-styles';
import './jobsite/jobsite-edit-dialog'
import { Dialog } from '@material/mwc-dialog';
import { Jobsite } from './types';
import { JobsiteEditDialog } from './jobsite/jobsite-edit-dialog';

@customElement('offers-view')
export class OffersView extends LitElement {
  @state()
  private query: string = '';

  @query('jobsite-dialog') jobsiteDialog!: JobsiteEditDialog;

  static styles = [
    globalStyles
  ]

  render() {
    return html`
    <mwc-textfield type=search
      icon=search
      value=${this.query}
      @keyup=${e => this.query=e.target.value}></mwc-textfield>


    <mwc-button icon="add" @click=${() => this.onAddButtonClick()}>jobsite</mwc-button>

    <jobsite-dialog></jobsite-dialog>
    `
  }

  private onAddButtonClick() {
  }

  private async editJobsite (type: 'add'|'edit', jobsite: Jobsite) {
    try {
      const returned = await this.jobsiteDialog.open(type, jobsite)
      console.log(returned)

      // save to remote
    }
    catch (e) {
      throw e
    }
  }

  private async addJobsite () {
    // Create a new jobsite object
    // or recycle the one in the edit dialog if one
    let jobsite
    if (this.jobsiteDialog.type === 'add' && this.jobsiteDialog.jobsite) {
      jobsite = this.jobsiteDialog.jobsite
    }
    else {
      jobsite = window.dataManager.constructJobsite()
    }


  }
}