export interface ICell {
  pretext: string;
  query: string;
  output: string;
  posttext: string;
}

export interface ITopic {
  title: string;
  description: string;
  filename: string;
  created: Date;
  modified: Date;  
  cells: ICell[];
}
