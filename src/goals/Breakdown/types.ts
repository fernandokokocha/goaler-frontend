import { Timeslot } from "../types";

export const getItemType = (index: number) => `level-${index}`;

export type DndLevel = {
  index: number;
  level: 1 | 2 | 3;
  value: number;
  time: string;
};
