import { Goal, Timeslot } from "../types";
import sortBy from "lodash/sortBy";
import { ProgressCheckpoint } from "./types";

export const validateProgressLine = (
  progressLine: ProgressCheckpoint[]
): boolean => {
  const sorted = sortBy(progressLine, "when");
  let lastValue = undefined;
  for (let i = 0; i < sorted.length; i += 1) {
    const item: ProgressCheckpoint = sorted[i];
    if (!item.progressPlanned) continue;

    if (lastValue && item.progressPlanned < lastValue) return false;

    lastValue = item.progressPlanned;
  }
  return true;
};

export const getInitialProgressLine = (goal: Goal): ProgressCheckpoint[] => {
  return [
    { when: "2021" as Timeslot, progressPlanned: goal.level1, level: 1 },
    { when: "2022" as Timeslot, progressPlanned: goal.level2, level: 2 },
    { when: "2023" as Timeslot, progressPlanned: goal.level3 / 2 },
    { when: "2024" as Timeslot, progressPlanned: goal.level3, level: 3 },
    { when: "2025" as Timeslot },
    { when: "2026" as Timeslot },
    { when: "2027" as Timeslot },
    { when: "2028" as Timeslot },
  ];
};
