import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import CardActions from "@mui/material/CardActions";
import CardHeader from "@mui/material/CardHeader";
import { Grid } from "@mui/material";
import EntityAvatar from "../../assets/avatar";
import { formatDate } from "../../utils/formatDate";

const ModelCardBox: React.FC<{ modelCard: any }> = ({ modelCard }) => {
  return (
    <Grid size={{ xs: 6, md: 4 }}>
      <Card sx={{ maxWidth: 345 }}>
        <CardHeader
          avatar={<EntityAvatar entity={modelCard?.entity} />}
          title={modelCard?.entity?.name}
          subheader={formatDate(modelCard?.createdAt)}
        />
        <CardMedia
          component="img"
          height="140"
          image="https://images.unsplash.com/photo-1542903660-eedba2cda473?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZGF0YXxlbnwwfHwwfHx8MA%3D%3D.png"
          alt="green iguana"
        />
        <CardContent sx={{ overflow: "hidden", height: 160 }}>
          <Typography gutterBottom variant="h5" component="div">
            {modelCard.name}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: "text.secondary",
              display: "-webkit-box",
              WebkitLineClamp: 3,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {modelCard.description}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" color="primary" sx={{ width: "100%" }}>
            view more
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default ModelCardBox;
