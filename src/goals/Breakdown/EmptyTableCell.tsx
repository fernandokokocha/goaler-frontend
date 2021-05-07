import React, { FC } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import TableCell from "@material-ui/core/TableCell";
import { useDrop } from "react-dnd";
import { DndLevel, getItemType } from "./types";
import { isMilestonesValid, Timeslot } from "../types";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    levelTableCell: {
      padding: 0,
      margin: 0,
    },
  })
);

export const Droppable: FC<{
  time: string;
  index: number;
  onDrop: (time: string, item: DndLevel) => void;
}> = ({ time, index, onDrop }) => {
  const canDropItem = (monitor: any) => {
    if (!monitor.canDrop()) return false;

    const item = monitor.getItem() as DndLevel;

    const level1when = item.level === 1 ? (time as Timeslot) : item.level1when;
    const level2when = item.level === 2 ? (time as Timeslot) : item.level2when;
    const level3when = item.level === 3 ? (time as Timeslot) : item.level3when;

    console.log(
      "canDrop?",
      { time, item },
      isMilestonesValid(level1when, level2when, level3when)
    );

    return isMilestonesValid(level1when, level2when, level3when);
  };

  const [{ canDrop, hover }, drop] = useDrop(() => ({
    accept: getItemType(index),
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
