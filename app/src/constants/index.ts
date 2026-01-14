export const SERVICE_ENTITY_BASE_URL = "http://localhost:3000/api/entity";
export const SERVICE_MODEL_CARD_BASE_URL =
  "http://localhost:3000/api/model-card";
export const SERVICE_MODEL_CARD_CONTENT_BASE_URL =
  "http://localhost:3000/api/model-card-content";
export const SERVICE_MODEL_CARD_PDF = "http://localhost:8080/upload_pdf";

export const MODEL_CARD_CREATOR_CHATBOT_OPEN_LINE = `
👋 Welcome to the AI Model Card content creation tool! You can now add content to the model card you previously created.

There are two ways to do this:
📄 Upload a PDF file with the model card content, or
💬 Enter the content here in the chat.

You can use the icon below to switch between these methods anytime!`;

export const MODEL_CARD_CREATOR_CHATBOT_QUESTIONS = [
  "Firstly, could you tell me the name of the provider (organization or team) responsible for this model?",
  "Thanks! What is the current model version (for example, v1.0.0)?",
  "Got it! What type of model is it (e.g., classifier, regressor, chatbot, ranking model)?",
  "Nice. What model architecture does it use (for example, a Transformer, CNN, RNN, or ensemble)?",
  "Great! could you briefly describe what the model does in 1–2 sentences?",
  "And what license is this model released under (or what are the usage terms)?",

  "Alright, moving on to intended use: who are the primary intended users of this model?",
  "Got it. In which application area is the primary use case (e.g., healthcare, education, finance)?",
  "What are the main primary use cases this model is intended for?",
  "Thanks. Who are the secondary intended users, if any?",
  "Nice — what application area does the secondary use belong to?",
  "Great. What secondary use cases are expected for this model?",

  "Next up: what hardware is required or recommended to run this model (for training and/or deployment)?",
  "Good to know — what software dependencies or runtime environment does this model require (frameworks, libraries, OS)?",

  "Alright, let’s talk evaluation. Which evaluation metrics were used to assess this model (e.g., accuracy, F1, latency)?",
  "Got it — what evaluation factors were considered (e.g., robustness, fairness, multilingual support, noise sensitivity)?",
  "Thanks! Which datasets were used for evaluation (names, sources, or brief descriptions)?",
  "Nice — what were the evaluation results or performance outcomes (key scores or benchmark highlights)?",

  "Now for training data: what training algorithm was used (e.g., supervised learning, fine-tuning, RLHF)?",
  "Great — what training dataset(s) was the model trained on (brief description or dataset names)?",
  "Almost there — can you summarize the training procedure (preprocessing, splits, tuning, stopping criteria)?",

  "Okay, ethical considerations next. What types of bias might be present or relevant for this model?",
  "Thanks — what bias mitigation steps were taken (or planned) to reduce these risks?",

  "Got it. What privacy concerns apply here (e.g., personal data, logging, re-identification risks)?",
  "Perfect — what privacy policy or safeguards are in place for using this model?",

  "Alright — what safety measures exist (e.g., confidence thresholds, human review, refusal rules)?",
  "Good point — what security measures protect the model and its outputs (e.g., access control, encryption, monitoring)?",
  "Thanks. Is there a defined safety and security policy (incident handling, audits, rollback procedures)?",

  "Now, regarding risk: what are the main risk factors of deploying or using this model?",
  "Got it — how would you rate the overall risk severity (low, medium, high), and why?",
  "Great — what risk mitigation measures are implemented (or recommended) to reduce impact?",

  "Okay, shifting to misuse. Who are unintended users that should not use this model?",
  "Understood — are there prohibited application areas where this model must not be used?",
  "Thanks! What are the most likely misuse cases you want to explicitly prevent or warn against?",

  "Almost done — which regulatory or legal requirements does this model need to adhere to?",
  "Perfect. Can you provide a regulatory compliance declaration (status, alignment claims, certification notes)?",
  "Alright, last section: what are the key limitations or known weaknesses of this model?",

  "Finally — do you have any caveats and recommendations users should follow when using this model?",
  "Processing data...",
  "Thank you very much for your information! Your answers have been saved, and you will be redirected in a short while to the next step: converting your model card to ODRL",
];
