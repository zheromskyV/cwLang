export interface Mark {
  _id?: string;
  value: number;
  message: string;
}

export type Marks = Mark[];

export type MarkInfo = Mark | undefined | null;
