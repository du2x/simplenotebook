export enum CellType {Text, Query};

export interface ICell {
  type: CellType;
  text: string;
  query: string;
  output: string;
}

export interface ITopic {
  title: string;
  description: string;
  filename: string;
  created: Date;
  modified: Date;
  cells: ICell[];
}
