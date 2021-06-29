import React from "react";
import TableCell from "@material-ui/core/TableCell";
import { ProgressCheckpoint, ProgressSlotAction, Timeslot } from "../types";
import { Button } from "@material-ui/core";
import AddValueDialog from "./AddValueDialog";
import MoveValueDialog from "./MoveValueDialog";

export const ProgressSlot = ({
  progressCheckpoint,
  onAction,
  columns,
  index,
}: {
  progressCheckpoint: ProgressCheckpoint;
  onAction: (
    index: number,
    action: ProgressSlotAction,
    when: Timeslot,
    value?: number
  ) => any;
  columns: Timeslot[];
  index: number;
}) => {
  let style: any = {};
  if (progressCheckpoint.level === 1) style.backgroundColor = "brown";
  if (progressCheckpoint.level === 2) style.backgroundColor = "grey";
  if (progressCheckpoint.level === 3) style.backgroundColor = "yellow";

  const handleAction = (clickedIndex: number, action: ProgressSlotAction) => {
    onAction(clickedIndex, action, progressCheckpoint.when);
  };

  const options = [];
  if (!progressCheckpoint.progressPlanned)
    options.push(
      <AddValueDialog
        progressCheckpoint={progressCheckpoint}
        onAction={onAction}
        key="add"
        index={index}
      />
    );
  if (progressCheckpoint.progressPlanned)
    options.push(
      <MoveValueDialog
        progressCheckpoint={progressCheckpoint}
        onAction={onAction}
        columns={columns}
        key="move"
        index={index}
      />
    );
  if (!progressCheckpoint.level && progressCheckpoint.progressPlanned)
    options.push(
      <Button
        variant="contained"
        size="small"
        color="primary"
        key="remove"
        onClick={() => handleAction(index, "remove")}
      >
        Remove
      </Button>
    );

  return (
    <TableCell align="right" key={progressCheckpoint.when} style={style}>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div>{progressCheckpoint.progressPlanned}</div>
        <div>{options}</div>
      </div>
    </TableCell>
  );
};
