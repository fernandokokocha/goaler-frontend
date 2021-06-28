import { Grid, Typography } from "@material-ui/core";
import { Goal, GoalWithBreakdown, Timeslot } from "./types";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import EventIcon from "@material-ui/icons/Event";
import { ProgressCheckpoint } from "./Breakdown/types";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
      backgroundColor: theme.palette.background.paper,
    },
  })
);

export const Calendar = ({
  goalsWithBreakdown,
  columns,
}: {
  goalsWithBreakdown: GoalWithBreakdown[];
  columns: Timeslot[];
}) => {
  const classes = useStyles();

  const getForColumn = (column: Timeslot): any[] => {
    const ret: any[] = [];
    goalsWithBreakdown.forEach((goalsWithBreakdown: GoalWithBreakdown) => {
      goalsWithBreakdown.breakdown.forEach((checkpoint: ProgressCheckpoint) => {
        if (checkpoint.when === column && checkpoint.progressPlanned) {
          ret.push(goalsWithBreakdown.goal);
        }
      });
    });

    return ret;
  };

  return (
    <>
      <Typography variant="h6" align="center" component="h6" gutterBottom>
        Calendar
      </Typography>

      <Grid container spacing={1}>
        {columns.map((column) => (
          <Grid item xs={3} key={`column-${column}`}>
            <Typography variant="h6" align="center" component="h6" gutterBottom>
              {column}
            </Typography>
            {getForColumn(column).map((goal: Goal) => (
              <List className={classes.root}>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar>
                      <EventIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={goal.name} secondary="Jan 9, 2014" />
                </ListItem>
              </List>
            ))}
          </Grid>
        ))}
      </Grid>
    </>
  );
};
