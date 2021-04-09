export type Inspiration = {
  name: string;
  link: string | null;
};

export type Goal = {
  name: string;
  level1: number;
  level2: number;
  level3: number;
  progress: number;
  explanation: string;
  inspiration: Inspiration;
  visualization: string;
};

export type CurrentLevel = {
  level: 1 | 2 | 3;
  current: number;
  max: number;
  percent: number;
};
