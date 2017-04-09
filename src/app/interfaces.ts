export interface ICell {
  pretext: string;
  query: string;
  output: string;
  posttext: string;
}

export interface ITopic {
  title: string;
  description: string;
  active: boolean;
  filename: string;
  cells: ICell[];
}
