import { useAtomValue, useSetAtom } from "jotai";
import { useEffect } from "react";
import {
  initPublicModelCardsAtom,
  publicModelCardsAtom,
} from "../stores/modelCards";

const useModelCards = () => {
  const publicModelCards = useAtomValue(publicModelCardsAtom);
  const setInitialPublicModelCards = useSetAtom(initPublicModelCardsAtom);

  useEffect(() => {
    if (!publicModelCards) {
      setInitialPublicModelCards();
    }
  }, [publicModelCards, setInitialPublicModelCards]);

  return publicModelCards;
};

export default useModelCards;
