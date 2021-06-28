import { Grid, Paper, Typography } from "@material-ui/core";
import { GoalWithBreakdown } from "./types";

export const Calendar = ({
  goalsWithBreakdown,
}: {
  goalsWithBreakdown: GoalWithBreakdown[];
}) => {
  return (
    <>
      <Typography variant="h6" align="center" component="h6" gutterBottom>
        Calendar
      </Typography>

      <Paper>
        <Grid container justify="flex-start" spacing={2}></Grid>
      </Paper>
    </>
  );
};
