import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { brown, grey, yellow } from "@material-ui/core/colors";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    table: {
      minWidth: 650,
    },

    brown: {
      color: theme.palette.getContrastText(brown[500]),
      backgroundColor: brown[500],
    },
    grey: {
      color: theme.palette.getContrastText(grey[500]),
      backgroundColor: grey[500],
    },
    yellow: {
      color: theme.palette.getContrastText(yellow[500]),
      backgroundColor: yellow[500],
    },
  })
);

const LevelTableCell = ({
  level,
  value,
}: {
  level: 1 | 2 | 3;
  value: number;
}) => {
  const classes = useStyles();

  let className;
  if (level === 1) {
    className = classes.brown;
  } else if (level === 2) {
    className = classes.grey;
  } else {
    className = classes.yellow;
  }

  return (
    <TableCell align="right" className={className}>
      {value}
    </TableCell>
  );
};

export const Breakdown = ({ goals }: { goals: any }) => {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table" size="small">
        <TableHead>
          <TableRow>
            <TableCell>#</TableCell>
            <TableCell align="right">Nazwa</TableCell>
            <TableCell align="right">2021</TableCell>
            <TableCell align="right">2022</TableCell>
            <TableCell align="right">2023</TableCell>
            <TableCell align="right">2024</TableCell>
            <TableCell align="right">2025</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {goals.map((row: any, index: number) => (
            <TableRow key={row.name}>
              <TableCell align="right">{index + 1}</TableCell>
              <TableCell align="right">{row.name}</TableCell>
              <LevelTableCell level={1} value={row.level1} />
              <LevelTableCell level={2} value={row.level2} />
              <LevelTableCell level={3} value={row.level3} />
              <TableCell align="right"></TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
