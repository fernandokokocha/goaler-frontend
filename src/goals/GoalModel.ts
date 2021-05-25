import { CurrentLevel, Goal } from "./types";

export const reached = (level: number, progress: number): boolean =>
  progress >= level;

export const calcPercent = (level: number, progress: number): number => {
  const num = Math.floor((progress / level) * 100);
  return Math.min(num, 100);
};

export const findCurrent = (row: Goal): CurrentLevel => {
  if (calcPercent(row.milestones.level1, row.progress) < 100) {
    return {
      level: 1,
      current: row.progress,
      max: row.milestones.level1,
      percent: calcPercent(row.milestones.level1, row.progress),
    };
  }

  if (calcPercent(row.milestones.level2, row.progress) < 100) {
    return {
      level: 2,
      current: row.progress,
      max: row.milestones.level2,
      percent: calcPercent(row.milestones.level2, row.progress),
    };
  }

  return {
    level: 3,
    current: row.progress,
    max: row.milestones.level3,
    percent: calcPercent(row.milestones.level3, row.progress),
  };
};
