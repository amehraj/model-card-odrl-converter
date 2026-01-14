import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  useTheme,
  InputAdornment,
  Tooltip,
} from "@mui/material";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import ClearIcon from "@mui/icons-material/Clear";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import {
  chatbotQuestionsIdxAtom,
  createdModelCardAtom,
  createdModelCardContentAtom,
  modelCardContentCreatorChatbotAtom,
  modelCardContentCreatorTypeAtom,
} from "../../stores/modelCards";
import { MODEL_CARD_CREATOR_CHATBOT_QUESTIONS } from "../../constants";
import { parseAnswersToModelCardContent } from "../../utils/parseAnswersToModelCardContent";
import { createModelCardContent } from "../../services/modelCardContent";
import { useNavigate } from "react-router-dom";

const Chatbot: React.FC = () => {
  const theme = useTheme();
  const setChatbotType = useSetAtom(modelCardContentCreatorTypeAtom);
  const createdModelCardId = useAtomValue(createdModelCardAtom);
  const [chats, setChats] = useAtom(modelCardContentCreatorChatbotAtom);
  const [text, setText] = useState("");
  const [sendDisabled, setSendDisabled] = useState(false);
  const [questionIdx, setQuestionsIdx] = useAtom(chatbotQuestionsIdxAtom);
  const [modelCardContent, setModelCardContent] = useAtom(
    createdModelCardContentAtom
  );
  const navigate = useNavigate();

  const isDarkMode = theme.palette.mode === "dark";
  const backgroundColor = isDarkMode
    ? theme.palette.grey[800]
    : theme.palette.background.default;
  const textColor = isDarkMode
    ? theme.palette.text.primary
    : theme.palette.text.secondary;

  const sendMessage = () => {
    const updatedUserChats: any = [
      { sendBy: "user", text: text.trim() },
      ...chats,
    ];
    const newIdx = questionIdx + 1;

    setChats(updatedUserChats);
    setQuestionsIdx(newIdx);
    setText("");
    setSendDisabled(true);

    setTimeout(async () => {
      const updatedServerChats: any = [
        {
          sendBy: "system",
          text: MODEL_CARD_CREATOR_CHATBOT_QUESTIONS[newIdx],
        },
        ...updatedUserChats,
      ];
      setChats(updatedServerChats);
      if (
        MODEL_CARD_CREATOR_CHATBOT_QUESTIONS[newIdx] === "Processing data..."
      ) {
        const modelCardContent =
          parseAnswersToModelCardContent(updatedServerChats);

        await createModelCardContent(createdModelCardId, modelCardContent);
        setModelCardContent(modelCardContent);

        setChats([
          {
            sendBy: "system",
            text: MODEL_CARD_CREATOR_CHATBOT_QUESTIONS[newIdx + 1],
          },
          ...updatedServerChats,
        ]);

        setTimeout(() => {
          navigate("/model-card-creator/odrl", { replace: true });
        }, 5000);
      } else {
        setSendDisabled(false);
      }
    }, 500);
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          height: "600px",
          overflow: "auto",
          scrollBehavior: "smooth",
          flexDirection: "column-reverse",
        }}
      >
        {chats.map((chat) => (
          <div
            style={{
              display: "flex",
              justifyContent: `flex-${chat.sendBy === "user" ? "end" : "start"}`,
            }}
          >
            <Box
              sx={{
                border: `1px solid ${theme.palette.divider}`,
                padding: 2,
                marginY: 2,
                borderRadius: "8px",
                backgroundColor: backgroundColor,
                textAlign: "left",
                width: "fit-content",
                maxWidth: "50%",
              }}
            >
              <Typography
                variant="body1"
                color={textColor}
                sx={{ whiteSpace: "pre-line" }}
              >
                {chat.text}
              </Typography>
            </Box>
          </div>
        ))}
      </div>

      <div style={{ display: "flex", position: "sticky", bottom: 0 }}>
        <Box
          sx={{
            bgcolor: "background.paper",
            paddingY: 4,
            left: 0,
            width: "100%",
            display: "flex",
            justifyContent: "center",
            textAlign: "center",
            maxWidth: "100%",
          }}
        >
          <TextField
            fullWidth
            id="outlined-multiline-flexible fullWidth"
            label="Add your prompt text here"
            multiline
            maxRows={4}
            value={text}
            slotProps={{
              input: {
                startAdornment: (
                  <Tooltip title="Switch to pdf mode">
                    <InputAdornment
                      position="start"
                      onClick={() => {
                        setChatbotType("pdf");
                      }}
                      sx={{ cursor: "pointer" }}
                    >
                      <AttachFileIcon />
                    </InputAdornment>
                  </Tooltip>
                ),
                endAdornment: (
                  <InputAdornment
                    position="end"
                    onClick={() => {
                      setText("");
                    }}
                    sx={{ cursor: "pointer" }}
                  >
                    <ClearIcon />
                  </InputAdornment>
                ),
              },
            }}
            onChange={(e) => {
              setText(e.target.value);
            }}
          />
        </Box>
        <Button
          sx={{ marginLeft: 2, marginY: 4 }}
          variant="contained"
          color="success"
          onClick={() => sendMessage()}
          disabled={!!modelCardContent && sendDisabled}
        >
          Send
        </Button>
      </div>
    </>
  );
};

export default Chatbot;
