import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { ProgressCheckpoint, ProgressSlotAction } from "../Breakdown";
import { Timeslot } from "../types";

export default function AddValueDialog({
  progressCheckpoint,
  onAction,
}: {
  progressCheckpoint: ProgressCheckpoint;
  onAction: (action: ProgressSlotAction, when: Timeslot, value?: number) => any;
}) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(0);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    onAction("add", progressCheckpoint.when, value);
  };

  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        size="small"
        onClick={handleClickOpen}
      >
        Add
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          Add value to {progressCheckpoint.when}
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            type="number"
            fullWidth
            value={value}
            onChange={(e) => {
              setValue(Number(e.target.value));
            }}
          />
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
