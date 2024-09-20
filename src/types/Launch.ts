export interface Launch {
  id: string;
  name: string;
  rocket: string;
  date_utc: string;
  links: {
    youtube_id?: string;
    article_link?: string;
    wikipedia?: string;
  };
}

export interface Rocket {
  id: string;
  name: string;
}
