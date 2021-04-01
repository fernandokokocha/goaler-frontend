import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { ProgressBar } from "react-bootstrap";
import { findCurrent, reached } from "./GoalModel";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const LevelTableCell = ({
  level,
  reached,
  previousReached,
}: {
  level: number;
  reached: boolean;
  previousReached: boolean;
}) => {
  let col;
  if (reached) {
    col = "yellow";
  } else if (!reached && previousReached) {
    col = "lightGreen";
  } else {
    col = "lightGrey";
  }

  return (
    <TableCell align="right" style={{ backgroundColor: col }}>
      {level}
    </TableCell>
  );
};

const CurrentTableCell = ({
  current,
  max,
  percent,
}: {
  current: number;
  max: number;
  percent: number;
}) => {
  return (
    <TableCell align="right">
      {`${current} / ${max}`}
      <ProgressBar now={percent} label={`${percent}%`} variant="info" />
    </TableCell>
  );
};

export const GoalList = ({ goals }: { goals: any }) => {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table" size="small">
        <TableHead>
          <TableRow>
            <TableCell>#</TableCell>
            <TableCell align="right">Nazwa</TableCell>
            <TableCell align="right">Inspiracja</TableCell>
            <TableCell align="right">O co chodzi</TableCell>
            <TableCell align="right" style={{ minWidth: 250 }}>
              Current
            </TableCell>
            <TableCell align="right">Poziom 1</TableCell>
            <TableCell align="right">Poziom 2</TableCell>
            <TableCell align="right">Poziom 3</TableCell>
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
              <CurrentTableCell
                current={findCurrent(row).current}
                max={findCurrent(row).max}
                percent={findCurrent(row).percent}
              ></CurrentTableCell>
              <LevelTableCell
                level={row.level1}
                reached={reached(row.level1, row.progress)}
                previousReached={true}
              ></LevelTableCell>
              <LevelTableCell
                level={row.level2}
                reached={reached(row.level2, row.progress)}
                previousReached={reached(row.level1, row.progress)}
              ></LevelTableCell>
              <LevelTableCell
                level={row.level3}
                reached={reached(row.level3, row.progress)}
                previousReached={reached(row.level2, row.progress)}
              ></LevelTableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
