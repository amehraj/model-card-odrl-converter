import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import { Grid } from "@mui/material";
import EntityAvatar from "../../assets/avatar";

const EntityCard: React.FC<{ entity: any; modelCardCount: any }> = ({
  entity,
  modelCardCount,
}) => {
  return (
    <Grid size={{ xs: 6, md: 4 }}>
      <Card sx={{ maxWidth: 345, maxHeight: 160 }}>
        <CardContent>
          <Stack direction="column" spacing={2}>
            <Typography
              gutterBottom
              sx={{ color: "text.secondary", fontSize: 14 }}
            >
              {entity?.accountType.charAt(0).toUpperCase() +
                entity?.accountType.substring(1)}
            </Typography>
            <Stack
              direction="row"
              spacing={2}
              sx={{
                justifyContent: "left",
                alignItems: "center",
              }}
            >
              <EntityAvatar entity={entity} />
              <Typography variant="h5" component="div">
                {entity?.name}
              </Typography>
            </Stack>
            <Typography sx={{ color: "text.secondary", mb: 1.5 }}>
              {modelCardCount} model cards
            </Typography>
          </Stack>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default EntityCard;
