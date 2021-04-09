import React, { FC, useState } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import { useDrop } from "react-dnd";
import { ItemTypes } from "./types";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    levelTableCell: {
      padding: 0,
      margin: 0,
    },
  })
);

export const Droppable: FC<{ time: string; index: number }> = ({
  time,
  index,
}) => {
  const canDropItem = (monitor: any) => {
    return monitor.canDrop() && index === (monitor.getItem() as any).index;
  };

  const [{ canDrop, hover }, drop] = useDrop(() => ({
    accept: ItemTypes.LEVEL,
    drop: (item) => handleDrop(item),
    collect: (monitor) => ({
      canDrop: canDropItem(monitor),
      hover: canDropItem(monitor) && monitor.isOver(),
    }),
  }));

  const handleDrop = (item: any) => {
    if (item.index != index) return;
    console.log(`dropped! Index ${index}, time ${time}, level ${item.level}`);
  };

  let style = {};

  if (hover) {
    style = {
      height: "50px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "green",
    };
  } else if (canDrop) {
    style = {
      height: "50px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "red",
    };
  } else {
    style = {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "50px",
    };
  }

  const textToRender = canDrop ? time : "";

  return (
    <div ref={drop} style={style}>
      {textToRender}
    </div>
  );
};

export const EmptyTableCell: FC<{ time: string; index: number }> = ({
  time,
  index,
}) => {
  const classes = useStyles();

  return (
    <TableCell align="right" className={classes.levelTableCell}>
      <Droppable index={index} time={time} />
    </TableCell>
  );
};
