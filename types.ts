export interface Song {
  id: string;
  status: string;
  user_created: string;
  date_created: string;
  user_updated: string;
  date_updated: string;
  name: string;
  artist: string;
  accent: string;
  gradient_accent: string; // color
  cover: string; //card image
  top_track: boolean;
  url: string;
}
