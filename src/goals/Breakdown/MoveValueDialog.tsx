import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { ProgressCheckpoint, ProgressSlotAction } from "../Breakdown";
import { Timeslot } from "../types";
import { MenuItem, Select } from "@material-ui/core";

export default function MoveValueDialog({
  progressCheckpoint,
  onAction,
  columns,
}: {
  progressCheckpoint: ProgressCheckpoint;
  onAction: (action: ProgressSlotAction, when: Timeslot, value?: any) => any;
  columns: Timeslot[];
}) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(progressCheckpoint.when);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    onAction("move", progressCheckpoint.when, value);
    handleClose();
  };

  let title = `Move ${progressCheckpoint.progressPlanned}`;
  if (progressCheckpoint.level) title += ` (level ${progressCheckpoint.level})`;
  title += ` from ${progressCheckpoint.when}`;

  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        size="small"
        onClick={handleClickOpen}
      >
        Move
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="move-dialog-title"
      >
        <DialogTitle id="move-dialog-title">{title}</DialogTitle>
        <DialogContent>
          <Select
            value={value}
            onChange={(e) => {
              setValue(e.target.value as Timeslot);
            }}
          >
            {columns.map((column) => (
              <MenuItem value={column} key={column}>
                {column}
              </MenuItem>
            ))}
          </Select>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
