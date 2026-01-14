import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import { getAllPublicModelCards } from "../services/modelCard";
import { createFormChangeAtom } from "./authForm";
import {
  MODEL_CARD_CREATOR_CHATBOT_OPEN_LINE,
  MODEL_CARD_CREATOR_CHATBOT_QUESTIONS,
} from "../constants";
import { resettableFormAtom } from "./resettableForm";

export const publicModelCardsAtom = atom<any>(null);

export const createdModelCardAtom = atomWithStorage<any>(
  "createdModelCard",
  null
);

export const initPublicModelCardsAtom = atom(null, async (_get, set) => {
  const cards = await getAllPublicModelCards();
  set(publicModelCardsAtom, cards);
});

export const modelCardCreatorAtom = resettableFormAtom(
  {
    name: "",
    description: "",
    coverImage: "",
    type: "public" as "public" | "private",
  },
  "modelCardCreator"
);

export const handleModelCardChangeAtom =
  createFormChangeAtom(modelCardCreatorAtom);

export const modelCardContentCreatorTypeAtom = atomWithStorage<"pdf" | "chat">(
  "modelCardContentCreatorType",
  "pdf"
);

export const modelCardContentCreatorPdfAtom = resettableFormAtom<
  { text: string; sendBy: "system" | "user" }[]
>([
  {
    text: `Please upload your file when you're ready. Just click the "Upload" button to pick your file, then hit "Send" to submit it to us. 😊`,
    sendBy: "system",
  },
  {
    text: MODEL_CARD_CREATOR_CHATBOT_OPEN_LINE.trim(),
    sendBy: "system",
  },
]);

export const modelCardContentCreatorChatbotAtom = resettableFormAtom<
  { text: string; sendBy: "system" | "user" }[]
>([
  {
    text: MODEL_CARD_CREATOR_CHATBOT_QUESTIONS[0],
    sendBy: "system",
  },
  {
    text: MODEL_CARD_CREATOR_CHATBOT_OPEN_LINE.trim(),
    sendBy: "system",
  },
]);

export const chatbotQuestionsIdxAtom = atom<number>(0);

export const createdModelCardContentAtom = atom<any>(null);

export const createdOdrlAtom = atom<any>(null);

export const modelCardPdfFile = atom<File | null>(null);

export const modelCardFileName = atom<string>("No file chosen.");
