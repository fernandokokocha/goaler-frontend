import React from "react";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import { Goal, Timeslot } from "../types";
import { ProgressCheckpoint, ProgressSlotAction } from "./types";
import { ProgressSlot } from "./ProgressSlot";

export const GoalRow = ({
  goal,
  index,
  columns,
  progressLine,
  onAction,
}: {
  goal: Goal;
  index: number;
  columns: Timeslot[];
  progressLine: ProgressCheckpoint[];
  onAction: (
    index: number,
    action: ProgressSlotAction,
    when: Timeslot,
    value?: number
  ) => any;
}) => {
  return (
    <TableRow key={index}>
      <TableCell align="right">{index + 1}</TableCell>
      <TableCell align="right">{goal.name}</TableCell>
      {progressLine.map((progressCheckpoint: ProgressCheckpoint) => (
        <ProgressSlot
          progressCheckpoint={progressCheckpoint}
          onAction={onAction}
          key={progressCheckpoint.when}
          columns={columns}
          index={index}
        />
      ))}
    </TableRow>
  );
};
