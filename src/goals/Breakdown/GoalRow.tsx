import React, { useMemo, useState } from "react";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import { Goal, Timeslot } from "../types";
import cloneDeep from "lodash/cloneDeep";
import sortBy from "lodash/sortBy";
import { ProgressCheckpoint, ProgressSlotAction } from "./types";
import { ProgressSlot } from "./ProgressSlot";
import { ProgressLine } from "./ProgressLine";

export const GoalRow = ({
  goal,
  index,
  columns,
}: {
  goal: Goal;
  index: number;
  columns: Timeslot[];
}) => {
  const initialProgressLine: ProgressCheckpoint[] = ProgressLine.fromMilestones(
    goal.milestones
  ).toArray();

  const [progressLine, setProgressLine] = useState(initialProgressLine);

  const witam = useMemo(() => {
    console.log({ progressLine });
  }, [progressLine]);

  useMemo(() => {
    columns.forEach((column) => {
      const found = progressLine.find(({ when }) => when === column);
      if (!found) {
        progressLine.push({ when: column });
      }
    });
    const newProgressLine = sortBy(progressLine, "when");
    setProgressLine(newProgressLine);
  }, [columns]);

  const handleAction = (
    action: ProgressSlotAction,
    actionWhen: Timeslot,
    value?: any
  ) => {
    const newProgressLine = cloneDeep(progressLine);

    if (action === "remove") {
      const found = newProgressLine.find(
        ({ when }: ProgressCheckpoint) => when === actionWhen
      ) as ProgressCheckpoint;
      found.progressPlanned = undefined;
      found.level = undefined;
    }

    if (action === "add") {
      const found = newProgressLine.find(
        ({ when }: ProgressCheckpoint) => when === actionWhen
      ) as ProgressCheckpoint;
      found.progressPlanned = value as number;
    }

    if (action === "move") {
      const found = newProgressLine.find(
        ({ when }: ProgressCheckpoint) => when === actionWhen
      ) as ProgressCheckpoint;
      const memo = cloneDeep(found);
      found.progressPlanned = undefined;
      found.level = undefined;

      const newFound = newProgressLine.find(
        ({ when }: ProgressCheckpoint) => when === (value as Timeslot)
      ) as ProgressCheckpoint;
      newFound.progressPlanned = memo.progressPlanned;
      newFound.level = memo.level;
    }

    const isValid =
      ProgressLine.fromProgressCheckpointList(newProgressLine).isValid();
    if (isValid) setProgressLine(newProgressLine);
    else {
      console.log("invalid progress line created; abort");
    }
  };

  return (
    <TableRow key={index}>
      <TableCell align="right">{index + 1}</TableCell>
      <TableCell align="right">{goal.name}</TableCell>
      {progressLine.map((progressCheckpoint: ProgressCheckpoint) => (
        <ProgressSlot
          progressCheckpoint={progressCheckpoint}
          onAction={handleAction}
          key={progressCheckpoint.when}
          columns={columns}
        />
      ))}
    </TableRow>
  );
};
