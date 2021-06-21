import React, { useMemo, useState } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Goal, GoalWithBreakdown, Timeslot } from "./types";
import { ColumnList } from "./Breakdown/ColumnList";
import { GoalRow } from "./Breakdown/GoalRow";
import { ProgressCheckpoint, ProgressSlotAction } from "./Breakdown/types";
import { ProgressLine } from "./Breakdown/ProgressLine";
import cloneDeep from "lodash/cloneDeep";
import sortBy from "lodash/sortBy";

export const initialColumns: Timeslot[] = [
  "2021",
  "2022",
  "2023",
  "2024",
  "2025",
  "2026",
  "2027",
  "2028",
];

const getInitialGoalsWithBreakdown = (goals: Goal[]): GoalWithBreakdown[] => {
  return goals.map((goal) => ({
    goal,
    breakdown: ProgressLine.fromMilestones(goal.milestones).toArray(),
  }));
};

export const Breakdown = ({ goals }: { goals: Goal[] }) => {
  const [columns, setColumns] = useState(initialColumns);
  const [goalsWithBreakdown, setGoalsWithBreakdown] = useState(
    getInitialGoalsWithBreakdown(goals)
  );

  useMemo(() => {
    const newGoalsWithBreakdown = cloneDeep(goalsWithBreakdown);
    newGoalsWithBreakdown.forEach((goalWithBreakdown) => {
      columns.forEach((column) => {
        const found = goalWithBreakdown.breakdown.find(
          ({ when }) => when === column
        );
        if (!found) {
          goalWithBreakdown.breakdown.push({ when: column });
        }
      });
      goalWithBreakdown.breakdown = sortBy(goalWithBreakdown.breakdown, "when");
    });
    setGoalsWithBreakdown(newGoalsWithBreakdown);
  }, [columns, goalsWithBreakdown]);

  const handleAction = (
    index: number,
    action: ProgressSlotAction,
    actionWhen: Timeslot,
    value?: any
  ) => {
    const newGoalsWithBreakdown = cloneDeep(goalsWithBreakdown);

    const oldProgressLine = newGoalsWithBreakdown[index].breakdown;
    const newProgressLine = cloneDeep(oldProgressLine);

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

    if (!isValid) {
      console.log("invalid progress line created; abort");
    } else {
      newGoalsWithBreakdown[index].breakdown = newProgressLine;
      setGoalsWithBreakdown(newGoalsWithBreakdown);
    }
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table aria-label="goals breakdown" size="small">
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
            {goalsWithBreakdown.map((goalWithBreakdown, index) => (
              <GoalRow
                goal={goalWithBreakdown.goal}
                index={index}
                key={index}
                columns={columns}
                progressLine={goalWithBreakdown.breakdown}
                onAction={handleAction}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <ColumnList columns={columns} setColumns={setColumns} />
    </>
  );
};
