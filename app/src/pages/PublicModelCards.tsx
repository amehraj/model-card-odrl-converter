import React from "react";
import ModelCardList from "../components/model-cards/ModelCardList";
import useModelCards from "../hooks/useModelCards";

const PublicModelCards: React.FC = () => {
  const publicModelCards = useModelCards();

  return (
    <>
      <ModelCardList modelCards={publicModelCards} />
    </>
  );
};

export default PublicModelCards;
