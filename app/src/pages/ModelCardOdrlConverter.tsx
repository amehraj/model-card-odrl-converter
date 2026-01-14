import React from "react";
import Grid from "@mui/material/Grid";
import {
  Button,
  CircularProgress,
  Paper,
  Stack,
  Typography,
  styled,
} from "@mui/material";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import {
  chatbotQuestionsIdxAtom,
  createdModelCardAtom,
  createdModelCardContentAtom,
  createdOdrlAtom,
  modelCardContentCreatorChatbotAtom,
  modelCardContentCreatorPdfAtom,
  modelCardCreatorAtom,
  modelCardFileName,
  modelCardPdfFile,
} from "../stores/modelCards";
import { createModelCardOdrl } from "../services/modelCard";
import { useNavigate } from "react-router-dom";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#fff",
  padding: theme.spacing(4),
  textAlign: "left",
  color: (theme.vars ?? theme).palette.text.secondary,
  ...theme.applyStyles("dark", {
    backgroundColor: "#1A2027",
  }),
  minHeight: "100%",
}));

const ModelCardOdrlConverter: React.FC = () => {
  const [createdModelCardId, setCreatedModelCardId] =
    useAtom(createdModelCardAtom);
  const createdModelCardContent = useAtomValue(createdModelCardContentAtom);
  const [createdOdrl, setCreatedOdrl] = useAtom(createdOdrlAtom);
  const setCreatedModelCard = useSetAtom(modelCardCreatorAtom);
  const setModelCardPdfChats = useSetAtom(modelCardContentCreatorPdfAtom);
  const setModelCardChatbotChats = useSetAtom(
    modelCardContentCreatorChatbotAtom
  );
  const setChatbotQuestionsIdx = useSetAtom(chatbotQuestionsIdxAtom);
  const setCreatedModelCardContent = useSetAtom(createdModelCardContentAtom);
  const setModelCardFile = useSetAtom(modelCardPdfFile);
  const setModelCardFileName = useSetAtom(modelCardFileName);
  const navigate = useNavigate();

  const convertToODRL = async () => {
    setCreatedOdrl("loading");
    const updatedModelCard = await createModelCardOdrl(
      createdModelCardId,
      createdModelCardContent
    );
    setCreatedOdrl(updatedModelCard?.odrl);
  };

  const downloadODRL = () => {
    const blob = new Blob([JSON.parse(createdOdrl)], {
      type: "application/json",
    });

    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `model-card-${createdModelCardId}.json`;
    link.click();

    URL.revokeObjectURL(link.href);
  };

  const resetModelCardCreator = () => {
    setCreatedModelCardId(null);
    setCreatedModelCard("RESET");
    setModelCardPdfChats("RESET");
    setModelCardChatbotChats("RESET");
    setChatbotQuestionsIdx(0);
    setCreatedModelCardContent(null);
    setModelCardFile(null);
    setModelCardFileName("No file chosen.");
    setCreatedOdrl(null);
    navigate("/model-card-creator/base", { replace: true });
  };

  return (
    <>
      <Stack
        direction="row"
        spacing={4}
        sx={{
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          my: 4,
        }}
      >
        <Button
          sx={{ height: 60 }}
          variant="contained"
          color="primary"
          onClick={convertToODRL}
        >
          Convert Model Card to ODRL
        </Button>
        <Button
          sx={{ height: 60 }}
          variant="contained"
          color="secondary"
          disabled={!createdOdrl || createdOdrl === "loading"}
          onClick={downloadODRL}
        >
          Save ODRL file (json format)
        </Button>
        <Button
          sx={{ height: 60 }}
          variant="contained"
          color="success"
          disabled={!createdOdrl || createdOdrl === "loading"}
          onClick={resetModelCardCreator}
        >
          Finish creating model card
        </Button>
      </Stack>
      <Grid container spacing={2}>
        <Grid size={6}>
          <Item>
            <Typography variant="h5" gutterBottom>
              Model Card Content
            </Typography>
            <Typography
              variant="body2"
              sx={{
                fontFamily: "monospace",
                whiteSpace: "pre-wrap",
                my: 2,
                overflowX: "auto",
              }}
              gutterBottom
            >
              {createdModelCardContent}
            </Typography>
          </Item>
        </Grid>
        <Grid size={6}>
          <Item>
            <Typography variant="h5" gutterBottom>
              ODRL Representation
            </Typography>
            <Typography
              variant="body2"
              sx={{
                fontFamily: "monospace",
                whiteSpace: "pre-wrap",
                my: 2,
                overflowX: "auto",
              }}
              gutterBottom
            >
              {createdOdrl === "loading"
                ? "Converting... this may take a while"
                : !!createdOdrl
                  ? JSON.parse(createdOdrl)
                  : ""}
            </Typography>
            {createdOdrl === "loading" ? <CircularProgress /> : <></>}
          </Item>
        </Grid>
      </Grid>
    </>
  );
};

export default ModelCardOdrlConverter;
