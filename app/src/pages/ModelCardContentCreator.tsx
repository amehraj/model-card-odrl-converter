import React from "react";
import Chatbot from "../components/chatbot/Chatbot";
import { useAtomValue } from "jotai";
import { modelCardContentCreatorTypeAtom } from "../stores/modelCards";
import PdfChatbot from "../components/chatbot/PdfChatbot";

const ModelCardContentCreator: React.FC = () => {
  const chatbotType = useAtomValue(modelCardContentCreatorTypeAtom);

  return chatbotType === "pdf" ? <PdfChatbot /> : <Chatbot />;
};

export default ModelCardContentCreator;
