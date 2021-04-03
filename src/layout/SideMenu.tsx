import { List, ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import {
  AddBox as AddBoxIcon,
  List as ListIcon,
  Dashboard as DashboardIcon,
  Restaurant as RestaurantIcon,
} from "@material-ui/icons";
import { Link } from "react-router-dom";

export const SideMenu = () => {
  return (
    <List>
      <ListItem button key="table" component={Link} to="/table">
        <ListItemIcon>
          <ListIcon />
        </ListItemIcon>
        <ListItemText primary="My goals" />
      </ListItem>
      <ListItem button key="visualization" component={Link} to="/visualization">
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Visualization" />
      </ListItem>
      <ListItem button key="breakdown" component={Link} to="/breakdown">
        <ListItemIcon>
          <RestaurantIcon />
        </ListItemIcon>
        <ListItemText primary="Breakdown" />
      </ListItem>
      <ListItem button key="add" component={Link} to="/add">
        <ListItemIcon>
          <AddBoxIcon />
        </ListItemIcon>
        <ListItemText primary="Add goal" />
      </ListItem>
    </List>
  );
};
