import { html, LitElement, nothing } from 'lit';
import { customElement, query, state } from 'lit/decorators.js';
import { Dialog } from '@material/mwc-dialog';
import { Jobsite } from '../types';

declare global {
  interface Window {
    jobsiteInformationDialog: JobsiteInformationDialog;
  }
}

@customElement('jobsite-information-dialog')
export class JobsiteInformationDialog extends LitElement {
  @state()
  private jobsite?: Jobsite;

  @query('mwc-dialog') dialog!: Dialog;

  render () {

    let j = this.jobsite;

    return html`
    <mwc-dialog heading=${j?.name}>
    ${j ? html`
      <div>${j.phone}</div>
    ` : nothing}
      <mwc-button outlined icon="delete" slot="secondaryAction" style="--mdc-theme-primary:red"
        @click=${() => this.delete()}>delete</mwc-button>
      <mwc-button outlined icon="edit" slot="secondaryAction"
        @click=${() => window.app.jobsitesView.editJobsite('edit', j!)}>edit</mwc-button>
      <mwc-button outlined slot="primaryAction" dialogAction="close">close</mwc-button>
    </mwc-dialog>
    `
  }

  open (jobsite: Jobsite) {
    this.jobsite = jobsite
    this.dialog.show()
  }

  delete () {
    if (confirm('Are you sure? no turning back')) {
      window.dataManager.removeJobsite(this.jobsite!)
      window.app.updateViews()
      this.dialog.close()
      window.dataManager.saveRemote()
    }
  }
}