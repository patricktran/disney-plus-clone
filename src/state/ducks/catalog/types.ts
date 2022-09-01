export type CollectionType =
  | "all"
  | "recommend"
  | "new"
  | "trending"
  | "original"
  | "origin";

export interface Catalog {
  id: number;
  backgroundImg: string;
  cardImg: string;
  description: string;
  subTitle: string;
  title: string;
  titleImg: string;
  type: CollectionType;
}

export type ProgramType = "movie" | "episode";
