import React from "react";
import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import ListSubheader from "@material-ui/core/ListSubheader";
import IconButton from "@material-ui/core/IconButton";
import InfoIcon from "@material-ui/icons/Info";
import { Avatar, Tooltip } from "@material-ui/core";
import { brown, grey, yellow } from "@material-ui/core/colors";
import { findCurrent } from "../models/Goal";
import { Goal, GoalWithBreakdown } from "./types";

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
      width: "100%",
    },
    icon: {
      color: "rgba(255, 255, 255, 0.54)",
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

const LevelBadge = ({ level }: { level: 1 | 2 | 3 }) => {
  const classes = useStyles();

  let className;

  if (level === 1) className = classes.brown;
  else if (level === 2) className = classes.grey;
  else className = classes.yellow;

  return (
    <Avatar
      className={className}
      style={{ position: "absolute", top: 10, left: 10 }}
    >
      {level}
    </Avatar>
  );
};

export const Visualization = ({ goalsWithBreakdown }: { goalsWithBreakdown: GoalWithBreakdown[] }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <GridList cellHeight={400} className={classes.gridList}>
        <GridListTile key="Subheader" cols={2} style={{ height: "auto" }}>
          <ListSubheader>Visualization</ListSubheader>
        </GridListTile>
        {goalsWithBreakdown.map(({goal}: {goal: Goal}) => (
          <GridListTile key={goal.visualization}>
            <img
              src={goal.visualization}
              alt={goal.name}
              style={{ position: "relative", objectFit: "scale-down" }}
            />
            <LevelBadge level={findCurrent(goal).level} />
            <GridListTileBar
              title={goal.name}
              actionIcon={
                <Tooltip title={goal.explanation}>
                  <IconButton
                    aria-label={`info about ${goal.name}`}
                    className={classes.icon}
                  >
                    <InfoIcon />
                  </IconButton>
                </Tooltip>
              }
            />
          </GridListTile>
        ))}
      </GridList>
    </div>
  );
};
