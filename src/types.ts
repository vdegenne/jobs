export type offers = {
  id: number;
  title: string;
  location: string;
  enterprise_id: number;
  jobsite_id: number;
  creation_date: number;
  state: 'seen'|'postulated'|'refused'|'accepted';
  note: string;
}

export type enterprises = {
  id: number;
  name: string;
  location: string;
  secteur: string;
  phone: string;
  email: string;
  note: string;
}

export type Jobsite = {
  id: number;
  name: string;
  type: 'interim'|'online';
  url: string;
  phone: string;
  note: string;
}