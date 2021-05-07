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
import {
  Goal,
  GoalBrokenDown,
  ProgressSlot,
  Timeslot,
  Level,
  Milestones,
} from "./types";
import { DndLevel } from "./Breakdown/types";

type X = {
  progressSlot: ProgressSlot;
  index: number;
  level1when: Timeslot;
  level2when: Timeslot;
  level3when: Timeslot;
};

export const Breakdown = ({ goals }: { goals: Goal[] }) => {
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

  const getInitialMilestones = (goals: Goal[]): Milestones[] => {
    return goals.map((goal: Goal) => ({
      goal: goal,
      level1: "2021",
      level2: "2022",
      level3: "2023",
    }));
  };

  const getBreakdowns = (milestones: Milestones[]): GoalBrokenDown[] => {
    return milestones.map((milestone: Milestones) => {
      const { goal } = milestone;
      const progressLine: ProgressSlot[] = [
        { when: milestone.level1, what: goal.level1, level: 1 },
        { when: milestone.level2, what: goal.level2, level: 2 },
        { when: milestone.level3, what: goal.level3, level: 3 },
      ];

      columns.forEach((column) => {
        const found = progressLine.find(({ when }) => when === column);
        if (!found) {
          progressLine.push({ when: column, what: null });
        }
      });

      const sortedProgressLine: ProgressSlot[] = progressLine.sort(
        (a, b) => Number(a.when) - Number(b.when)
      );

      return { goal, progressLine: sortedProgressLine };
    });
  };

  const initialMilestones: Milestones[] = getInitialMilestones(goals);

  const [milestones, setMilestones] = useState(initialMilestones);

  const goalsBrokenDown = getBreakdowns(milestones);

  const handleDrop = (
    newTime: string,
    { index, level, value, time: oldTime }: DndLevel
  ) => {
    console.log("Dropped!", { index, level, value, time: oldTime, newTime });

    const newMilestones: Milestones[] = [...milestones];
    const changedMilestones: Milestones = newMilestones[index];

    if (level === 1) {
      changedMilestones.level1 = newTime as Timeslot;
    } else if (level === 2) {
      changedMilestones.level2 = newTime as Timeslot;
    } else if (level === 3) {
      changedMilestones.level3 = newTime as Timeslot;
    }

    setMilestones(newMilestones);
  };

  const renderTimeSlot = (something: X, key: number) => {
    const {
      progressSlot,
      index,
      level1when,
      level2when,
      level3when,
    } = something;

    if (progressSlot.what)
      return (
        <LevelTableCell
          key={key}
          index={index}
          level={progressSlot.level as Level}
          value={progressSlot.what}
          time={progressSlot.when}
          level1when={level1when}
          level2when={level2when}
          level3when={level3when}
        />
      );

    return (
      <EmptyTableCell
        key={key}
        index={index}
        time={progressSlot.when}
        onDrop={handleDrop}
      />
    );
  };

  const generateTimeslots = (goal: GoalBrokenDown, index: number): X[] => {
    let ret: X[] = [];

    const { progressLine } = goal;

    for (let i = 0; i < progressLine.length; i += 1) {
      const progressSlot: ProgressSlot = progressLine[i];

      const level1 = goal.progressLine.find(({ level }) => level == 1);
      const level1when: Timeslot = level1 ? level1.when : "2021";

      const level2 = goal.progressLine.find(({ level }) => level == 2);
      const level2when: Timeslot = level2 ? level2.when : "2021";

      const level3 = goal.progressLine.find(({ level }) => level == 3);
      const level3when: Timeslot = level3 ? level3.when : "2021";

      ret.push({ progressSlot, index, level1when, level2when, level3when });
    }
    return ret;
  };

  const renderGoalRow = (goalBrokenDown: GoalBrokenDown, index: number) => (
    <TableRow key={index}>
      <TableCell align="right">{index + 1}</TableCell>
      <TableCell align="right">{goalBrokenDown.goal.name}</TableCell>
      {generateTimeslots(goalBrokenDown, index).map(renderTimeSlot)}
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
              {columns.map((column, index) => (
                <TableCell align="center" key={`time-column-${index}`}>
                  {column}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>{goalsBrokenDown.map(renderGoalRow)}</TableBody>
        </Table>
      </TableContainer>
    </DndProvider>
  );
};
