import { Timeslot } from "../types";

export type ProgressCheckpoint = {
  when: Timeslot;
  progressPlanned?: number;
  level?: 1 | 2 | 3;
};

export type ProgressSlotAction = "move" | "remove" | "add";
