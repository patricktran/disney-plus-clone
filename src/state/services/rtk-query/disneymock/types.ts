export type ContinueWatchingItem = {
  programType: string;
  title: string;
  subTitle?: string;
  progressValue: number;
  imageSrc: string;
  onHoverImageSrc?: string;
  remainingTimeM?: number;
};

export type EpisodeItem = {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
};
