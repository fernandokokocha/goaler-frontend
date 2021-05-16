import React, { FC, useMemo, useState } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Goal, Timeslot } from "./types";
import { Button } from "@material-ui/core";
import cloneDeep from "lodash/cloneDeep";
import sortBy from "lodash/sortBy";
import AddValueDialog from "./Breakdown/AddValueDialog";
import MoveValueDialog from "./Breakdown/MoveValueDialog";

export const columns: Timeslot[] = [
  "2021",
  "2022",
  "2023",
  "2024",
  "2025",
  "2026",
  "2027",
  "2028",
];

export type ProgressCheckpoint = {
  when: Timeslot;
  progressPlanned?: number;
  level?: 1 | 2 | 3;
};

export type ProgressSlotAction = "move" | "remove" | "add";

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

const ProgressSlot = ({
  progressCheckpoint,
  onAction,
}: {
  progressCheckpoint: ProgressCheckpoint;
  onAction: (action: ProgressSlotAction, when: Timeslot, value?: number) => any;
}) => {
  let style: any = {};
  if (progressCheckpoint.level === 1) style.backgroundColor = "brown";
  if (progressCheckpoint.level === 2) style.backgroundColor = "grey";
  if (progressCheckpoint.level === 3) style.backgroundColor = "yellow";

  const handleAction = (action: ProgressSlotAction) => {
    onAction(action, progressCheckpoint.when);
  };

  const options = [];
  if (!progressCheckpoint.progressPlanned)
    options.push(
      <AddValueDialog
        progressCheckpoint={progressCheckpoint}
        onAction={onAction}
        key="add"
      />
    );
  if (progressCheckpoint.progressPlanned)
    options.push(
      <MoveValueDialog
        progressCheckpoint={progressCheckpoint}
        onAction={onAction}
        columns={columns}
        key="move"
      />
    );
  if (!progressCheckpoint.level && progressCheckpoint.progressPlanned)
    options.push(
      <Button
        variant="contained"
        size="small"
        color="primary"
        key="remove"
        onClick={() => handleAction("remove")}
      >
        Remove
      </Button>
    );

  return (
    <TableCell align="right" key={progressCheckpoint.when} style={style}>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div>{progressCheckpoint.progressPlanned}</div>
        <div>{options}</div>
      </div>
    </TableCell>
  );
};

const GoalRow = ({ goal, index }: { goal: Goal; index: number }) => {
  const initialProgressLine: ProgressCheckpoint[] = getInitialProgressLine(
    goal
  );

  const [progressLine, setProgressLine] = useState(initialProgressLine);

  const witam = useMemo(() => {
    console.log({ progressLine });
  }, [progressLine]);

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
        />
      ))}
    </TableRow>
  );
};

export const Breakdown = ({ goals }: { goals: Goal[] }) => {
  return (
    <DndProvider backend={HTML5Backend}>
      <TableContainer component={Paper}>
        <Table aria-label="simple table" size="small">
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell align="center">Nazwa</TableCell>
              {columns.map((column, index) => (
                <TableCell align="center" key={`time-column-${index}`}>
                  {column}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {goals.map((goal, index) => (
              <GoalRow goal={goal} index={index} key={index} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </DndProvider>
  );
};
