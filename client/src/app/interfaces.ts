export enum CellType {Text, Query};

export interface ICell {
  type: CellType;
  text: string;
  query: {
    text: string,
    output: string,
    datetime: Date
    //connection: string;
  }
}

export interface ITopic {
  title: string;
  filename: string;
  dirty: boolean;
  created: Date;
  modified: Date;
  cells: ICell[];
}
