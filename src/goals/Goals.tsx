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

const rows = [
  {
    name: "Video is king",
    inspiration: "Dawid Czerw",
    link: null,
    explenation: "Nagrane video na YouTube",
    level1: 10,
    level2: 100,
    level3: 1000,
    progress: 5,
  },
  {
    name: "Blogger",
    inspiration: "Andrzej Krzywda",
    link: null,
    explenation: "Napisane blog posty",
    level1: 10,
    level2: 100,
    level3: 1000,
    progress: 1,
  },
  {
    name: "1000 true fans",
    inspiration: "Kevin Kelly",
    link: "https://kk.org/thetechnium/1000-true-fans/",
    explenation: "Fani - ktoś kto kupił 2 produkty",
    level1: 1,
    level2: 33,
    level3: 1000,
    progress: 0,
  },
  {
    name: "Architekt",
    inspiration: "Darek",
    link: null,
    explenation: "Liczba side projektów, z których ktoś korzysta",
    level1: 1,
    level2: 3,
    level3: 10,
    progress: 5,
  },
];

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

export const Goals = () => {
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
          {rows.map((row, index) => (
            <TableRow key={row.name}>
              <TableCell align="right">{index + 1}</TableCell>
              <TableCell align="right">{row.name}</TableCell>
              <TableCell align="right">
                {row.link ? (
                  <a href={row.link}>{row.inspiration}</a>
                ) : (
                  row.inspiration
                )}
              </TableCell>
              <TableCell align="right">{row.explenation}</TableCell>
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
