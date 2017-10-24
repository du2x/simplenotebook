export enum CellType {Text, Query};

export interface ICell {
  type: CellType;
  content: string;
  datetime: Date;
  output: string;
}

export interface ITopic {
  title: string;
  filename: string;
  dirty: boolean;
  created: Date;
  modified: Date;
  cells: ICell[];
}
