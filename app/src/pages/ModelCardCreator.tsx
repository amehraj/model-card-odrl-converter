import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button, MenuItem } from "@mui/material";
import { createModelCard } from "../services/modelCard";
import { useAtom, useSetAtom } from "jotai";
import {
  createdModelCardAtom,
  modelCardCreatorAtom,
  publicModelCardsAtom,
} from "../stores/modelCards";
import { useNavigate } from "react-router-dom";
import useModelCards from "../hooks/useModelCards";

const ModelCardCreator: React.FC = () => {
  const [createdModelCard, setCreatedModelCard] = useAtom(createdModelCardAtom);
  const publicModelCards = useModelCards();
  const setPublicModelCards = useSetAtom(publicModelCardsAtom);
  const [modelCardForm, setModelCardForm] = useAtom(modelCardCreatorAtom);
  const navigate = useNavigate();

  console.log(createdModelCard);

  const accountTypes = [
    { value: "public", label: "Public" },
    { value: "private", label: "Private" },
  ];

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { id, value } = e.target;
    setModelCardForm({
      ...modelCardForm,
      [id]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { type, ...rest } = modelCardForm;
    const modelCard = await createModelCard({
      ...rest,
      isPrivate: type === "private",
    });
    setCreatedModelCard(modelCard._id);
    if (type === "public") {
      setPublicModelCards([...publicModelCards, modelCard]);
    }
    navigate("/model-card-creator/content", { replace: true });
  };

  return (
    <Box
      component="form"
      sx={{
        "& > :not(style)": {
          m: 1,
          width: "75ch",
        },
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: 2,
      }}
      noValidate
      autoComplete="off"
    >
      <TextField
        id="name"
        label="Name"
        variant="outlined"
        onChange={handleInputChange}
        value={modelCardForm.name}
        disabled={!!createdModelCard}
      />
      <TextField
        id="description"
        label="Description"
        variant="outlined"
        multiline
        onChange={handleInputChange}
        value={modelCardForm.description}
        disabled={!!createdModelCard}
      />
      <TextField
        id="coverImage"
        label="Cover Image"
        variant="outlined"
        onChange={handleInputChange}
        value={modelCardForm.coverImage}
        disabled={!!createdModelCard}
      />
      <TextField
        id="type"
        defaultValue="public"
        select
        label="Type of model card"
        onChange={handleInputChange}
        value={modelCardForm.type}
        disabled={!!createdModelCard}
      >
        {accountTypes.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
      <Button
        sx={{ maxWidth: "30%", height: 60 }}
        variant="contained"
        onClick={handleSubmit}
        disabled={!!createdModelCard}
      >
        Create
      </Button>
    </Box>
  );
};

export default ModelCardCreator;
