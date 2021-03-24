import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const X = ({
  level,
  reached,
  previousReached,
}: {
  level: number;
  reached: boolean;
  previousReached: boolean;
}) => {
  if (reached) {
    return (
      <TableCell align="right" style={{ backgroundColor: "yellow" }}>
        {level}
      </TableCell>
    );
  }

  if (!reached && previousReached) {
    return (
      <TableCell align="right" style={{ backgroundColor: "lightGreen" }}>
        {level}
      </TableCell>
    );
  }

  return (
    <TableCell align="right" style={{ backgroundColor: "lightGrey" }}>
      {level}
    </TableCell>
  );
};

export const GoalList = ({ goals }: { goals: any }) => {
  const classes = useStyles();

  const reached = (level: number, progress: number): boolean =>
    progress >= level;

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table" size="small">
        <TableHead>
          <TableRow>
            <TableCell>#</TableCell>
            <TableCell align="right">Nazwa</TableCell>
            <TableCell align="right">Inspiracja</TableCell>
            <TableCell align="right">O co chodzi</TableCell>
            <TableCell align="right">Poziom 1</TableCell>
            <TableCell align="right">Poziom 2</TableCell>
            <TableCell align="right">Poziom 3</TableCell>
            <TableCell align="right">Progres</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {goals.map((row: any, index: number) => (
            <TableRow key={row.name}>
              <TableCell align="right">{index + 1}</TableCell>
              <TableCell align="right">{row.name}</TableCell>
              <TableCell align="right">
                {row.inspiration.link ? (
                  <a href={row.inspiration.link}>{row.inspiration.name}</a>
                ) : (
                  row.inspiration.name
                )}
              </TableCell>
              <TableCell align="right">{row.explanation}</TableCell>
              <X
                level={row.level1}
                reached={reached(row.level1, row.progress)}
                previousReached={true}
              ></X>
              <X
                level={row.level2}
                reached={reached(row.level2, row.progress)}
                previousReached={reached(row.level1, row.progress)}
              ></X>
              <X
                level={row.level3}
                reached={reached(row.level3, row.progress)}
                previousReached={reached(row.level2, row.progress)}
              ></X>
              <TableCell align="right">{row.progress}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
