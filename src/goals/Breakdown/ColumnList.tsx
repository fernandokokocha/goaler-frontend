import React, { useState } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Timeslot } from "../types";
import { TextField, Typography } from "@material-ui/core";

export const ColumnList = ({
  columns,
  setColumns,
}: {
  columns: Timeslot[];
  setColumns: (newColumns: Timeslot[]) => void;
}) => {
  const [newColumn, setNewColumn] = useState("");

  const onSubmit = () => {
    const newColumns = [...columns];
    const found = newColumns.find((column) => column == newColumn);
    if (!found) {
      newColumns.push(newColumn);
      const newColumnsSorted = newColumns.sort();
      setColumns(newColumnsSorted);
    }

    setNewColumn("");
  };

  return (
    <>
      <Typography variant="h4">Kolumny</Typography>
      <TableContainer component={Paper}>
        <Table aria-label="columns table" size="small">
          <TableBody>
            {columns.map((column, index) => (
              <TableRow key={`column-${index}`}>
                <TableCell align="center">
                  {column}
                </TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell align="center" key={`add-column`}>
                <TextField
                  id="add-new-column"
                  type="text"
                  placeholder="Add new"
                  value={newColumn}
                  onChange={(e) => {
                    setNewColumn(e.target.value);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      onSubmit();
                    }
                  }}
                />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};
