import React, { FC } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import TableCell from "@material-ui/core/TableCell";
import { useDrop } from "react-dnd";
import { ItemTypes } from "./types";
import { DndLevel } from "./types";

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
    return monitor.canDrop() && index === (monitor.getItem() as any).index;
  };

  const [{ canDrop, hover }, drop] = useDrop(() => ({
    accept: ItemTypes.LEVEL,
    drop: (item: DndLevel) => onDrop(time, item),
    collect: (monitor) => ({
      canDrop: canDropItem(monitor),
      hover: canDropItem(monitor) && monitor.isOver(),
    }),
  }));

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
