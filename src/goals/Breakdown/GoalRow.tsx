import React, { useMemo, useState } from "react";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import { Goal, Timeslot } from "../types";
import cloneDeep from "lodash/cloneDeep";
import sortBy from "lodash/sortBy";
import { ProgressCheckpoint, ProgressSlotAction } from "./types";
import { ProgressSlot } from "./ProgressSlot";

const validateProgressLine = (progressLine: ProgressCheckpoint[]): boolean => {
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

const getInitialProgressLine = (goal: Goal): ProgressCheckpoint[] => {
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

export const GoalRow = ({
  goal,
  index,
  columns,
}: {
  goal: Goal;
  index: number;
  columns: Timeslot[];
}) => {
  const initialProgressLine: ProgressCheckpoint[] =
    getInitialProgressLine(goal);

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

    const isValid = validateProgressLine(newProgressLine);
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
