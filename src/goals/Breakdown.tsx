import React, { FC } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { brown, grey, yellow } from "@material-ui/core/colors";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Draggable } from "./utils/Draggable";
import Droppable from "./utils/Droppable";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    table: {
      minWidth: 650,
    },
    levelTableCell: {
      padding: 0,
      margin: 0,
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

const EmptyTableCell: FC<{ id: string }> = ({ id, children }) => {
  const classes = useStyles();

  return (
    <TableCell align="right" className={classes.levelTableCell}>
      <Droppable id={id}>
        {children}
      </Droppable>
    </TableCell>
  );
};

const LevelTableCell: FC<{ id: string; level: 1 | 2 | 3 }> = ({
  id,
  level,
  children,
}) => {
  const classes = useStyles();

  let classNames = `${classes.levelTableCell} `;
  if (level === 1) {
    classNames += classes.brown;
  } else if (level === 2) {
    classNames += classes.grey;
  } else {
    classNames += classes.yellow;
  }

  return (
    <TableCell align="right" className={classNames}>
      <Draggable id={id}>
        <div style={{ display: "flex", justifyContent: "center" }}>
          {children}
        </div>
      </Draggable>
    </TableCell>
  );
};

export const Breakdown = ({ goals }: { goals: any }) => {
  const classes = useStyles();

  return (
    <DndProvider backend={HTML5Backend}>
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

                <LevelTableCell level={1} id={`${index}-1`}>
                  {row.level1}
                </LevelTableCell>
                <LevelTableCell level={2} id={`${index}-2`}>
                  {row.level2}
                </LevelTableCell>
                <LevelTableCell level={3} id={`${index}-3`}>
                  {row.level3}
                </LevelTableCell>

                <EmptyTableCell id={`${index}-2024`}></EmptyTableCell>
                <EmptyTableCell id={`${index}-2025`}></EmptyTableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </DndProvider>
  );
};
