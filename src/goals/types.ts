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

export type Level = 1 | 2 | 3;

export type Timeslot =
  | "2021"
  | "2022"
  | "2023"
  | "2024"
  | "2025"
  | "2026"
  | "2027"
  | "2028";

export type ProgressSlot = {
  when: Timeslot;
  what: number | null;
  level?: Level;
};

export type GoalBrokenDown = {
  goal: Goal;
  progressLine: ProgressSlot[];
};
