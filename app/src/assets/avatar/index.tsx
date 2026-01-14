import React from "react";
import { Avatar } from "@mui/material";
import { red } from "@mui/material/colors";

const EntityAvatar: React.FC<{ entity: any }> = ({ entity }) => {
  return !entity.profilePicture ? (
    <Avatar sx={{ bgcolor: red[500] }} aria-label="aecipe">
      {entity?.name?.charAt(0).toUpperCase()}
    </Avatar>
  ) : (
    <Avatar
      sx={{ width: 32, height: 32 }}
      alt={entity?.name?.charAt(0).toUpperCase()}
      src={entity?.profilePicture}
    />
  );
};

export default EntityAvatar;
