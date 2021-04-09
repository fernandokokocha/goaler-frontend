import React, { FC } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import TableCell from "@material-ui/core/TableCell";
import { brown, grey, yellow } from "@material-ui/core/colors";
import { useDrag } from "react-dnd";
import { ItemTypes } from "./types";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
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

const Draggable: FC<{ index: number; level: 1 | 2 | 3 }> = ({
  index,
  level,
  children,
}) => {
  const [{ opacity }, dragRef] = useDrag(
    () => ({
      type: ItemTypes.LEVEL,
      item: { index, level },
      collect: (monitor) => ({
        opacity: monitor.isDragging() ? 0.5 : 1,
      }),
    }),
    []
  );
  return (
    <div ref={dragRef} style={{ opacity }}>
      {children}
    </div>
  );
};

export const LevelTableCell: FC<{ index: number; level: 1 | 2 | 3 }> = ({
  index,
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
      <Draggable index={index} level={level}>
        <div style={{ display: "flex", justifyContent: "center" }}>
          {children}
        </div>
      </Draggable>
    </TableCell>
  );
};