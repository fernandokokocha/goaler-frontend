import React from "react";
import TableCell from "@material-ui/core/TableCell";
import { Timeslot } from "../types";
import { Button } from "@material-ui/core";
import AddValueDialog from "./AddValueDialog";
import MoveValueDialog from "./MoveValueDialog";
import { ProgressCheckpoint, ProgressSlotAction } from "./types";

export const ProgressSlot = ({
  progressCheckpoint,
  onAction,
  columns,
}: {
  progressCheckpoint: ProgressCheckpoint;
  onAction: (action: ProgressSlotAction, when: Timeslot, value?: number) => any;
  columns: Timeslot[];
}) => {
  let style: any = {};
  if (progressCheckpoint.level === 1) style.backgroundColor = "brown";
  if (progressCheckpoint.level === 2) style.backgroundColor = "grey";
  if (progressCheckpoint.level === 3) style.backgroundColor = "yellow";

  const handleAction = (action: ProgressSlotAction) => {
    onAction(action, progressCheckpoint.when);
  };

  const options = [];
  if (!progressCheckpoint.progressPlanned)
    options.push(
      <AddValueDialog
        progressCheckpoint={progressCheckpoint}
        onAction={onAction}
        key="add"
      />
    );
  if (progressCheckpoint.progressPlanned)
    options.push(
      <MoveValueDialog
        progressCheckpoint={progressCheckpoint}
        onAction={onAction}
        columns={columns}
        key="move"
      />
    );
  if (!progressCheckpoint.level && progressCheckpoint.progressPlanned)
    options.push(
      <Button
        variant="contained"
        size="small"
        color="primary"
        key="remove"
        onClick={() => handleAction("remove")}
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
