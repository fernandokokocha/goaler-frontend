import React from "react";
import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import ListSubheader from "@material-ui/core/ListSubheader";
import IconButton from "@material-ui/core/IconButton";
import InfoIcon from "@material-ui/icons/Info";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "space-around",
      overflow: "hidden",
      backgroundColor: theme.palette.background.paper,
    },
    gridList: {
      width: '50%',
      height: 400,
    },
    icon: {
      color: "rgba(255, 255, 255, 0.54)",
    },
  })
);

export const GoalCards = ({ goals }: { goals: any }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <GridList cellHeight={180} className={classes.gridList}>
        <GridListTile key="Subheader" cols={2} style={{ height: "auto" }}>
          <ListSubheader component="div">Your goals</ListSubheader>
        </GridListTile>
        {goals.map((goal: any) => (
          <GridListTile key={goal.visualization}>
            <img src={goal.visualization} alt={goal.name} />
            <GridListTileBar
              title={goal.name}
              subtitle={<span>{goal.explanation}</span>}
              actionIcon={
                <IconButton
                  aria-label={`info about ${goal.name}`}
                  className={classes.icon}
                >
                  <InfoIcon />
                </IconButton>
              }
            />
          </GridListTile>
        ))}
      </GridList>
    </div>
  );
};
