import { html, LitElement } from 'lit'
import { customElement, query } from 'lit/decorators.js'
import '@material/mwc-tab-bar'
import '@material/mwc-snackbar'
import './DataManager'
import './jobsite/jobsites-view'
import { JobsitesView } from './jobsite/jobsites-view'

declare global {
  interface Window {
    app: JobApp;
    toast: (labelText: string, timeoutMs?: number) => void;
  }
}

@customElement('job-app')
export class JobApp extends LitElement {

  @query('jobsites-view') jobsitesView!: JobsitesView;

  constructor () {
    super()

    // this.fetchData()
    window.dataManager.fetchData()
  }

  render() {
    return html`
    <mwc-tab-bar>
      <mwc-tab label="offers"></mwc-tab>
      <mwc-tab label="enterprises"></mwc-tab>
      <mwc-tab label="jobsites"></mwc-tab>
    </mwc-tab-bar>

    <jobsites-view></jobsites-view>
    `
  }

  updateViews () {
    this.jobsitesView.requestUpdate()
    window.jobsiteInformationDialog.requestUpdate()
    // window.jobsiteDialog.requestUpdate()
  }
}