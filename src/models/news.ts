export interface INews {
  by: string;
  descendants: number;
  id: number;
  score: number;
  text?: string;
  kids?: number[];
  time: number;
  title: string;
  type: string;
  url?: string;
}
