import { Data, Jobsite } from './types';

declare global {
  interface Window {
    dataManager: DataManager;
  }
}

export class DataManager {
  public data: Data = { offers: [], enterprises: [], jobsites: [] }

  public get jobsites () {
    return this.data['jobsites']
  }

  async fetchData () {
    const res = await fetch('/data')
    this.data = await res.json()
    window.app.requestUpdate()
    window.app.jobsitesView.requestUpdate()
  }

  async saveRemote () {
    return;
    await fetch('/data', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(this.data)
    })
  }


  /* Jobsite related */
  get nextJobsiteId () {
    const ids = this.data.jobsites.map(j => j.id).sort((a, b) => b - a)
    // console.log(ids)
    let i = 0;
    while (ids.includes(i)) ++i;
    return i
  }

  constructJobsite (): Jobsite {
    return {
      id: this.nextJobsiteId,
      type: '',
      name: 'Untitled Jobsite',
      phone: '',
      url: '',
      note: '',
    }
  }

  addJobsite (j: Jobsite) {
    this.data.jobsites.push(j)
  }
  removeJobsite (j: Jobsite) {
    this.data.jobsites.splice(this.data.jobsites.indexOf(j), 1)
  }
}

window.dataManager = new DataManager