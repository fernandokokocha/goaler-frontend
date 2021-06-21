import { ProgressCheckpoint } from "./Breakdown/types";

export type Inspiration = {
  name: string;
  link: string | null;
};

export type Goal = {
  name: string;
  milestones: Milestones;
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

export type Timeslot = string;

export type ProgressSlot = {
  when: Timeslot;
  what: number | null;
  level?: Level;
};

export type Milestones = {
  level1: number;
  level2: number;
  level3: number;
};

export type GoalWithBreakdown = {
  goal: Goal;
  breakdown: ProgressCheckpoint[];
};
