import { Timeslot } from "../types";

export const ItemTypes = {
  LEVEL: "level",
};

export type DndLevel = {
  index: number;
  level: 1 | 2 | 3;
  value: number;
  time: string;
  upperbound: Timeslot;
  lowerbound: Timeslot;
};
