export interface Book {
  id: string;
  title: string;
  description: string;
  numberOfPages: number;
  publishedYear: number;
  status: BookStatus;
}

export enum BookStatus {
  NEW = 'NEW',
  IN_REPROCESING = 'IN_REPROCESING',
  IN_REVIEW = 'IN_REVIEW',
  REVIEWED = 'REVIEWED',
}
