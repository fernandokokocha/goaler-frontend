import React, { FC, useState } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { LevelTableCell } from "./Breakdown/LevelTableCell";
import { EmptyTableCell } from "./Breakdown/EmptyTableCell";
import { Goal, GoalBrokenDown, ProgressSlot, Timeslot, Level } from "./types";
import { DndLevel } from "./Breakdown/types";

export const Breakdown = ({ goals }: { goals: Goal[] }) => {
  const getInitialBreakdowns = (goals: Goal[]): GoalBrokenDown[] => {
    return goals.map((goal: Goal) => ({
      goal: goal,
      progressLine: [
        { when: "2021", what: goal.level1, level: 1 },
        { when: "2022", what: goal.level2, level: 2 },
        { when: "2023", what: goal.level3, level: 3 },
        { when: "2024", what: null },
        { when: "2025", what: null },
        { when: "2026", what: null },
        { when: "2027", what: null },
        { when: "2028", what: null },
      ],
    }));
  };

  const x: GoalBrokenDown[] = getInitialBreakdowns(goals);

  const [goalsBrokenDown, setGoalsBrokenDown] = useState(x);

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

  const handleDrop = (
    newTime: string,
    { index, level, value, time: oldTime }: DndLevel
  ) => {
    const newGoalsBrokenDown: GoalBrokenDown[] = [...goalsBrokenDown];
    const changedGoal: GoalBrokenDown = newGoalsBrokenDown[index];

    const oldProgressSlot = changedGoal.progressLine.find(
      ({ when }) => when === oldTime
    ) as ProgressSlot;
    oldProgressSlot.what = null;
    oldProgressSlot.level = undefined;

    const newProgressSlot = changedGoal.progressLine.find(
      ({ when }) => when === newTime
    ) as ProgressSlot;
    newProgressSlot.what = value;
    newProgressSlot.level = level;

    setGoalsBrokenDown(newGoalsBrokenDown);
  };

  const renderTimeSlot = (progressSlot: ProgressSlot, index: number, lowerbound: Timeslot, upperbound: Timeslot) => {
    if (progressSlot.what)
      return (
        <LevelTableCell
          index={index}
          level={progressSlot.level as Level}
          value={progressSlot.what}
          time={progressSlot.when}
          upperbound={upperbound}
          lowerbound={lowerbound}
        />
      );

    return (
      <EmptyTableCell
        index={index}
        time={progressSlot.when}
        onDrop={handleDrop}
      />
    );
  };

  const renderGoalRow = (goalBrokenDown: GoalBrokenDown, index: number) => (
    <TableRow key={index}>
      <TableCell align="right">{index + 1}</TableCell>
      <TableCell align="right">{goalBrokenDown.goal.name}</TableCell>
      {goalBrokenDown.progressLine.map((progressSlot: ProgressSlot) =>
        renderTimeSlot(progressSlot, index, '2021', '2026')
      )}
    </TableRow>
  );

  return (
    <DndProvider backend={HTML5Backend}>
      <TableContainer component={Paper}>
        <Table aria-label="simple table" size="small">
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell align="center">Nazwa</TableCell>
              {columns.map((column) => (
                <TableCell align="center">{column}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>{goalsBrokenDown.map(renderGoalRow)}</TableBody>
        </Table>
      </TableContainer>
    </DndProvider>
  );
};
