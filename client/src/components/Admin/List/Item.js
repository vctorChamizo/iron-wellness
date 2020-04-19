import React from "react";

import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";

export const Item = ({ children }) => {
  const name = children.name + " " + children.surname;

  return (
    <>
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt="Avatar" src={children.image?.url} />
        </ListItemAvatar>
        <ListItemText primary={name} secondary={children.username} />
      </ListItem>
    </>
  );
};
