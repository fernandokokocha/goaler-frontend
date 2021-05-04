import React, { FC } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import TableCell from "@material-ui/core/TableCell";
import { useDrop } from "react-dnd";
import { DndLevel, ItemTypes } from "./types";
import { Timeslot } from "../types";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    levelTableCell: {
      padding: 0,
      margin: 0,
    },
  })
);

const includes = (
  timeslot: Timeslot,
  lowerbound: Timeslot,
  upperbound: Timeslot
) => {
  const isHigherThanLowerbound = Number(timeslot) >= Number(lowerbound);
  const isLowerThanUpperbound = Number(timeslot) <= Number(upperbound);

  return isHigherThanLowerbound && isLowerThanUpperbound;
};

export const Droppable: FC<{
  time: string;
  index: number;
  onDrop: (time: string, item: DndLevel) => void;
}> = ({ time, index, onDrop }) => {
  const canDropItem = (monitor: any) => {
    if (!monitor.canDrop()) return false;

    const item = monitor.getItem() as DndLevel;
    const isLevelEqual = index === item.index;

    return isLevelEqual && includes(time as Timeslot, item.lowerbound, item.upperbound);
  };

  const [{ canDrop, hover }, drop] = useDrop(() => ({
    accept: ItemTypes.LEVEL,
    drop: (item: DndLevel) => onDrop(time, item),
    collect: (monitor) => ({
      canDrop: canDropItem(monitor),
      hover: canDropItem(monitor) && monitor.isOver(),
    }),
  }));

  let style: any = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "50px",
  };

  if (hover) {
    style.backgroundColor = "green";
  } else if (canDrop) {
    style.backgroundColor = "red";
  }

  const textToRender = canDrop ? time : "";

  return (
    <div ref={drop} style={style}>
      {textToRender}
    </div>
  );
};

export const EmptyTableCell: FC<{
  time: string;
  index: number;
  onDrop: (time: string, item: DndLevel) => void;
}> = ({ time, index, onDrop }) => {
  const classes = useStyles();

  return (
    <TableCell align="right" className={classes.levelTableCell}>
      <Droppable index={index} time={time} onDrop={onDrop} />
    </TableCell>
  );
};
