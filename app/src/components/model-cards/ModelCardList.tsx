import React from "react";
import Grid from "@mui/material/Grid";
import ModelCardBox from "./ModelCardBox";

const ModelCardList: React.FC<{ modelCards: any }> = ({ modelCards }) => {
  return (
    <>
      <Grid container spacing={4}>
        {modelCards?.map((mc: any) => (
          <ModelCardBox key={mc._id} modelCard={mc} />
        ))}
      </Grid>
    </>
  );
};

export default ModelCardList;
