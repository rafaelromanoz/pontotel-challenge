export interface Launch {
  id: string;
  name: string;
  rocket: string;
  date_utc: string;
  links: {
    youtube_id?: string;
    article?: string;
    wikipedia?: string;
    patch: {
      small: string;
      large: string;
    };
  };
}

export interface Rocket {
  id: string;
  name: string;
  company: string;
  first_flight: string;
  height: {
    meters: number;
  };
  mass: {
    kg: 30146;
  };
}
