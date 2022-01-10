import { html, LitElement, nothing } from 'lit';
import { customElement, query, state } from 'lit/decorators.js';
import { live } from 'lit/directives/live.js';
import { Jobsite } from '../types';
import '@material/mwc-dialog'
import '@material/mwc-textfield'
import '@material/mwc-textarea'
import '@material/mwc-select'
import { Dialog } from '@material/mwc-dialog';
import { globalStyles } from '../global-styles';
import { firstLetterUpperCase } from '../util';

declare global {
  interface Window {
    jobsiteEditDialog: JobsiteEditDialog;
  }
}

@customElement('jobsite-edit-dialog')
export class JobsiteEditDialog extends LitElement {
  @state()
  public type: 'add'|'edit' = 'add';
  @state()
  public jobsite?: Jobsite;

  private _resolve?: (value: unknown) => void;
  private _reject?: (reason?: any) => void;

  @query('mwc-dialog') dialog!: Dialog;

  static styles = [
    globalStyles
  ]

  render () {
    // window.toast('jobsite dialog updated')

    const j = this.jobsite;

    return html`
    <mwc-dialog heading="${firstLetterUpperCase(this.type)} Jobsite (#${j?.id})"
      escapeKeyAction="" scrimClickAction="">
    ${j ? html`
      <div>
        <mwc-textfield value=${j.name}
          @click=${e => { if (e.target.value === 'Untitled Jobsite') { e.target.select() } }}
          @keyup=${e => j.name = e.target.value}></mwc-textfield>
        <mwc-select value=${j.type}
          @change=${e => j.type = e.target.value}>
          <mwc-list-item>select a type...</mwc-list-item>
          <mwc-list-item value="interim">Interim</mwc-list-item>
          <mwc-list-item value="online">Online</mwc-list-item>
        </mwc-select>
        <mwc-textfield value=${j.url}
          placeholder="url"
          @keyup=${e => j.url = e.target.value}></mwc-textfield>
        <mwc-textfield value=${j.phone}
          type="phone"
          placeholder="phone number"
          @keyup=${e => j.phone = e.target.value}></mwc-textfield>
        <mwc-textarea value=${j.note} rows=12
          placeholder="note"
          @keyup=${e => j.note = e.target.value}></mwc-textarea>
      </div>

      <mwc-button outlined slot="secondaryAction" dialogAction="close"
        @click=${() => this.onRejectDialog()}>close</mwc-button>
      <mwc-button unelevated slot="primaryAction" dialogAction="close"
        @click=${() => this.onResolveDialog()}>${this.type === 'add' ? 'add' : 'save'}</mwc-button>

    ` : nothing }
    </mwc-dialog>
    `
  }

  private onResolveDialog() {
    this._resolve!(this.jobsite)
  }
  private onRejectDialog() {
    this._reject!()
  }

  open(type: 'add'|'edit', jobsite: Jobsite) {
    this.type = type;
    this.jobsite = jobsite;
    this.dialog.show()
    return new Promise((resolve, reject) => {
      this._resolve = resolve
      this._reject = reject
    })
  }

  reset() {
    this.jobsite = undefined;
  }
}