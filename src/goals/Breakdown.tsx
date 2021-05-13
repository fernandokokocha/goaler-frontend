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

const columns: Timeslot[] = [
  "2021",
  "2022",
  "2023",
  "2024",
  "2025",
  "2026",
  "2027",
  "2028",
];

type ProgressCheckpoint = {
  when: Timeslot;
  progressPlanned?: number;
  level?: 1 | 2 | 3;
};

const getProgressLine = (goal: Goal): ProgressCheckpoint[] => {
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
}: {
  progressCheckpoint: ProgressCheckpoint;
}) => {
  let style: any = {};
  if (progressCheckpoint.level === 1) style.backgroundColor = "brown";
  if (progressCheckpoint.level === 2) style.backgroundColor = "grey";
  if (progressCheckpoint.level === 3) style.backgroundColor = "yellow";

  const options = [];
  if (!progressCheckpoint.progressPlanned)
    options.push(
      <Button variant="contained" size="small" color="primary">
        Add
      </Button>
    );
  if (progressCheckpoint.progressPlanned)
    options.push(
      <Button variant="contained" size="small" color="primary">
        Move
      </Button>
    );
  if (!progressCheckpoint.level && progressCheckpoint.progressPlanned)
    options.push(
      <Button variant="contained" size="small" color="primary">
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
  const progressLine: ProgressCheckpoint[] = getProgressLine(goal);

  return (
    <TableRow key={index}>
      <TableCell align="right">{index + 1}</TableCell>
      <TableCell align="right">{goal.name}</TableCell>
      {progressLine.map((progressCheckpoint: ProgressCheckpoint) => (
        <ProgressSlot progressCheckpoint={progressCheckpoint} />
      ))}
    </TableRow>
  );
};

export const Breakdown = ({ goals }: { goals: Goal[] }) => {
  console.log({ goals });

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
