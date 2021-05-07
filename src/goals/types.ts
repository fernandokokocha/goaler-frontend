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

export type Milestones = {
  goal: Goal;
  level1: Timeslot;
  level2: Timeslot;
  level3: Timeslot;
};

export const isMilestonesValid = (
  level1when: Timeslot,
  level2when: Timeslot,
  level3when: Timeslot
) => {
  return (
    Number(level2when) > Number(level1when) &&
    Number(level3when) > Number(level2when)
  );
};
