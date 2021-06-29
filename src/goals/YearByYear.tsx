import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { GoalWithBreakdown, Timeslot } from "./types";
import { GoalRow } from "./Breakdown/GoalRow";
import { ProgressCheckpoint, ProgressSlotAction } from "./types";
import { ProgressLine } from "../models/ProgressLine";
import cloneDeep from "lodash/cloneDeep";
import { Button } from "@material-ui/core";

export const YearByYear = ({
  goalsWithBreakdown,
  setGoalsWithBreakdown,
  columns,
  setColumns,
}: {
  goalsWithBreakdown: GoalWithBreakdown[];
  setGoalsWithBreakdown: (newGoalsWithBreakdown: GoalWithBreakdown[]) => void;
  columns: Timeslot[];
  setColumns: (newColumns: Timeslot[]) => void;
}) => {
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

  const addYear = () => {
    const maxColumn = columns[columns.length - 1];
    const newColumn = String(parseInt(maxColumn) + 1);
    const newColumns = [...columns, newColumn];
    setColumns(newColumns);
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
              <TableCell align="center" key="time-column-add">
                <Button
                  onClick={addYear}
                  variant="contained"
                  size="small"
                  color="secondary"
                >
                  Add
                </Button>
              </TableCell>
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
    </>
  );
};
