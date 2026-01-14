export const parseAnswersToModelCardContent = (
  messages: {
    text: string;
    sendBy: "server" | "user";
  }[]
) => {
  console.log(messages);
  const userMessage = [...messages.filter((msg) => msg.sendBy === "user")]
    .reverse()
    .map((msg) => msg.text);

  console.log(userMessage);

  let i = 0;

  const content = {
    modelDetails: {
      responsibleOrganization: userMessage[i++],
      date: userMessage[i++],
      version: userMessage[i++],
      type: userMessage[i++],
      associatedResources: userMessage[i++],
      citationDetails: userMessage[i++],
      license: userMessage[i++],
    },
    intendedUse: {
      primary: userMessage[i++],
      secondary: userMessage[i++],
      intendedUsers: userMessage[i++],
      prohibited: userMessage[i++],
    },
    factors: {
      relevant: userMessage[i++],
      evaluation: userMessage[i++],
    },
    metrics: {
      performanceMeasure: userMessage[i++],
      decisionThreshold: userMessage[i++],
      variationApproaches: userMessage[i++],
    },
    evaluationData: {
      datasets: userMessage[i++],
      motivation: userMessage[i++],
      preprocessing: userMessage[i++],
    },
    trainingData: {
      algorithm: userMessage[i++],
      dataset: userMessage[i++],
      motivation: userMessage[i++],
      preprocessing: userMessage[i++],
    },
    quantitativeAnalysis: {
      unitary: userMessage[i++],
      intersectional: userMessage[i++],
    },
    ethicalConsiderations: {
      bias: userMessage[i++],
      privacy: userMessage[i++],
      safety: userMessage[i++],
      security: userMessage[i++],
      risksAndHarms: userMessage[i++],
      misuses: userMessage[i++],
    },
    caveatsAndRecommendations: userMessage[i++],
    limitations: userMessage[i++],
  };

  return JSON.stringify(content, null, 2);
};
