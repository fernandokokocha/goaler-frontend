import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export const Breakdown = ({ goals }: { goals: any }) => {
  const classes = useStyles();

  return <div>Breakdown</div>;
};
