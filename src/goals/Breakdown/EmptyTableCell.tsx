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
  const isHigherThanLowerbound = Number(timeslot) > Number(lowerbound);
  const isLowerThanUpperbound = Number(timeslot) < Number(upperbound);

  console.log(
    "includes",
    { timeslot, lowerbound, upperbound },
    "returning",
    isHigherThanLowerbound && isLowerThanUpperbound
  );
  return isHigherThanLowerbound && isLowerThanUpperbound;
};

const isMilestonesValid = (
  level1when: Timeslot,
  level2when: Timeslot,
  level3when: Timeslot
) => {
  return (
    Number(level2when) > Number(level1when) &&
    Number(level3when) > Number(level2when)
  );
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

    const level1when = item.level === 1 ? (time as Timeslot) : item.level1when;
    const level2when = item.level === 2 ? (time as Timeslot) : item.level2when;
    const level3when = item.level === 3 ? (time as Timeslot) : item.level3when;

    return (
      isLevelEqual &&
      // includes(time as Timeslot, item.lowerbound, item.upperbound)
      isMilestonesValid(level1when, level2when, level3when)
    );
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
