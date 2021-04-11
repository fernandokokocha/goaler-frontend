import React, { FC, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
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
import { Goal } from "./types";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

type Level = 1 | 2 | 3;

type Tile = {
  level: Level;
  value: number;
};

type Breakdown = {
  name: string;
  "2021": Tile | null;
  "2022": Tile | null;
  "2023": Tile | null;
  "2024": Tile | null;
  "2025": Tile | null;
  "2026": Tile | null;
};

type Timeslot = keyof typeof Breakdown;

export const Breakdown = ({ goals }: { goals: Goal[] }) => {
  const classes = useStyles();

  const timeSlots = ["2021", "2022", "2023", "2024", "2025", "2026"];

  const getInitialBreakdowns = (): Breakdown[] => {
    return goals.map((goal: Goal) => ({
      name: goal.name,
      "2021": { level: 1, value: goal.level1 },
      "2022": { level: 2, value: goal.level2 },
      "2023": { level: 3, value: goal.level3 },
      "2024": null,
      "2025": null,
      "2026": null,
    }));
  };

  const initialBreakdowns: Breakdown[] = getInitialBreakdowns();

  const renderTimeSlot = (
    timeSlot: string,
    breakdown: Breakdown,
    index: number
  ) => {
    const x = timeSlot as Timeslot;
    if (breakdown[x])
      return (
        <LevelTableCell level={(breakdown[x] as Tile).level} index={index}>
          {(breakdown[x] as Tile).value}
        </LevelTableCell>
      );

    return <EmptyTableCell index={index} time={timeSlot} />;
  };

  const renderGoalRow = (breakdown: Breakdown, index: number) => (
    <TableRow key={breakdown.name}>
      <TableCell align="right">{index + 1}</TableCell>
      <TableCell align="right">{breakdown.name}</TableCell>
      {timeSlots.map((timeslot) => renderTimeSlot(timeslot, breakdown, index))}
    </TableRow>
  );

  return (
    <DndProvider backend={HTML5Backend}>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table" size="small">
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell align="right">Nazwa</TableCell>
              {timeSlots.map((timeSlot) => (
                <TableCell align="right">{timeSlot}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>{initialBreakdowns.map(renderGoalRow)}</TableBody>
        </Table>
      </TableContainer>
    </DndProvider>
  );
};
