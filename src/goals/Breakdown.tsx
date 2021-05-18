import React, { useState } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Goal, Timeslot } from "./types";
import { ColumnList } from "./Breakdown/ColumnList";
import { GoalRow } from "./Breakdown/GoalRow";

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

export const Breakdown = ({ goals }: { goals: Goal[] }) => {
  const [columns, setColumns] = useState(initialColumns);

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
            {goals.map((goal, index) => (
              <GoalRow
                goal={goal}
                index={index}
                key={index}
                columns={columns}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <ColumnList columns={columns} setColumns={setColumns} />
    </>
  );
};
