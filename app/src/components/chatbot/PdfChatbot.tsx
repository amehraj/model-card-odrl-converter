import React, { useRef } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  useTheme,
  InputAdornment,
  Tooltip,
} from "@mui/material";
import ForumIcon from "@mui/icons-material/Forum";
import ClearIcon from "@mui/icons-material/Clear";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import {
  createdModelCardAtom,
  createdModelCardContentAtom,
  modelCardContentCreatorPdfAtom,
  modelCardContentCreatorTypeAtom,
  modelCardFileName,
  modelCardPdfFile,
} from "../../stores/modelCards";
import { uploadPdfFile } from "../../services/modelCardContent";
import { MODEL_CARD_CREATOR_CHATBOT_QUESTIONS } from "../../constants";
import { useNavigate } from "react-router-dom";

const PdfChatbot: React.FC = () => {
  const theme = useTheme();
  const createdModelCardId = useAtomValue(createdModelCardAtom);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [chats, setChats] = useAtom(modelCardContentCreatorPdfAtom);
  const [text, setText] = useAtom(modelCardFileName);
  const [file, setFile] = useAtom(modelCardPdfFile);
  const setChatbotType = useSetAtom(modelCardContentCreatorTypeAtom);
  const setModelCardContent = useSetAtom(createdModelCardContentAtom);
  const navigate = useNavigate();

  const isDarkMode = theme.palette.mode === "dark";
  const backgroundColor = isDarkMode
    ? theme.palette.grey[800]
    : theme.palette.background.default;
  const textColor = isDarkMode
    ? theme.palette.text.primary
    : theme.palette.text.secondary;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (files && files[0]) {
      setFile(files[0]);
      setText(files[0].name);

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } else {
      setText("Unsupported file type, choose another file.");
    }
  };

  const sendMessage = () => {
    const updatedUserChats: any = [
      { sendBy: "user", text: text.trim() },
      ...chats,
    ];

    setChats(updatedUserChats);
    setText("No file chosen.");

    setTimeout(async () => {
      const updatedServerChats: any = [
        { sendBy: "server", text: "Processing data..." },
        ...updatedUserChats,
      ];

      setChats(updatedServerChats);

      try {
        if (file) {
          const formData = new FormData();
          formData.append("file", file);
          const data = await uploadPdfFile(createdModelCardId, formData);

          setModelCardContent(JSON.stringify(data, null, 2));
        }
      } catch {
        setChats([
          {
            sendBy: "server",
            text: "File type or content is not supported. Please upload another file.",
          },
          ...updatedServerChats,
        ]);
      }

      setChats([
        {
          sendBy: "server",
          text: MODEL_CARD_CREATOR_CHATBOT_QUESTIONS.slice(-1)[0],
        },
        ...updatedServerChats,
      ]);

      setTimeout(() => {
        navigate("/model-card-creator/odrl", { replace: true });
      }, 5000);
    }, 500);
  };

  const clearFile = () => {
    setFile(null);
    setText("No file chosen");
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
        {chats.map((chat, idx) => (
          <div
            key={`${chat.sendBy}-${idx}`}
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
                  <Tooltip title="Switch to chat mode">
                    <InputAdornment
                      position="start"
                      onClick={() => {
                        setChatbotType("chat");
                      }}
                      sx={{ cursor: "pointer" }}
                    >
                      <ForumIcon />
                    </InputAdornment>
                  </Tooltip>
                ),
                endAdornment: (
                  <InputAdornment
                    position="end"
                    onClick={clearFile}
                    sx={{ cursor: "pointer" }}
                  >
                    <ClearIcon />
                  </InputAdornment>
                ),
              },
            }}
          />
        </Box>
        <Button
          variant="contained"
          color="success"
          component="label"
          sx={{ marginLeft: 2, marginY: 4 }}
        >
          Upload
          <input
            type="file"
            ref={fileInputRef}
            accept="application/pdf"
            hidden
            onChange={handleFileChange}
          />
        </Button>
        <Button
          sx={{ marginLeft: 2, marginY: 4 }}
          variant="contained"
          color="success"
          disabled={!file}
          onClick={() => sendMessage()}
        >
          Send
        </Button>
      </div>
    </>
  );
};

export default PdfChatbot;
