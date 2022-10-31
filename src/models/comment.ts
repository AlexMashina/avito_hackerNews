export interface IComment {
  id: number;
  by: string;
  kids?: number[];
  parent: number;
  text: string;
  type: string;
  time: number;
}
