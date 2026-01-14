import { Request, Response } from "express";
import { Unauthorized, NotFound, BadRequest } from "../utils/httpError.js";
import { ModelCard } from "../models/index.ts";
import OpenAI from "openai";

const openaiClient = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const getAllPublicModelCards = async (req: Request, res: Response) => {
  const publicModelCards = await ModelCard.find({ isPrivate: false }).populate(
    "entity",
    "name profilePicture"
  );
  res.json(publicModelCards);
};

export const getAllModelCardsFromAnEntity = async (
  req: Request,
  res: Response
) => {
  const { entityId } = req.params;

  const modelCards = await ModelCard.find({
    entity: entityId,
    ...(req.entity?._id !== entityId && { isPrivate: false }),
  });

  res.json(modelCards);
};

export const getModelCardById = async (req: Request, res: Response) => {
  const { id } = req.params;

  const modelCard = await ModelCard.findById(id);

  if (!modelCard) {
    throw new NotFound("No model card found!");
  }

  if (req.entity?._id !== modelCard.entity && modelCard.isPrivate) {
    throw new Unauthorized(
      "You have no authorization to view this model card!"
    );
  }

  res.json(modelCard);
};

export const createModelCard = async (req: Request, res: Response) => {
  const modelCard = new ModelCard({
    ...req.body,
    entity: req.entity?._id,
  });

  const newModelCard = await ModelCard.create(modelCard);

  res.status(201).json(newModelCard);
};

export const updateModelCard = async (req: Request, res: Response) => {
  const { id } = req.params;

  const modelCard = await ModelCard.findById(id);

  if (!modelCard) {
    throw new NotFound("No model card found!");
  }

  if (req.entity?._id !== modelCard.entity) {
    throw new Unauthorized(
      "You have no authorization to edit this model card!"
    );
  }

  Object.assign(modelCard, req.body);

  await modelCard.save();

  res.status(200).json(modelCard);
};

export const createModelCardOdrl = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { data } = req.body;

  console.log(req.body);

  try {
    const parseCompletion = await openaiClient.beta.chat.completions.parse({
      model: "o4-mini",
      messages: [
        {
          role: "system",
          content: `
          You are an expert converter that transforms any AI model card JSON into a *complete*, *Linked‑Data*‑ready ODRL JSON‑LD policy.  Follow these **strict** rules:
          1. **@context**
            - Start with:
              [
                "http://www.w3.org/ns/odrl.jsonld",
                {
                  "dc":      "http://purl.org/dc/elements/1.1/",
                  "dcterms": "http://purl.org/dc/terms/",
                  "foaf":    "http://xmlns.com/foaf/0.1/",
                  "xsd":     "http://www.w3.org/2001/XMLSchema#",
                  "ex":      "http://example.org/modelcard/terms#",
                }
              ]

          2. **Policy wrapper**
            - Top‑level object **must** be:

            {
              "@type": "odrl:Policy",
              "uid": "...unique policy IRI...",
              "profile": "http://example.org/odrl/profile/modelcard",
              "target":  { ... },
              "party": [ ... ],
              "permission": [ ... ],
              "prohibition": [ ... ],
              "duty": [ ... ]
            }

            - For prohibition, permission and duty, it should include appropriate @type.
            - The "target" is the Asset constructed from **Model Details**.

          3. **Model Details → target Asset**
            - Map:
            - Name → dc:title
            - Provider → nested dc:creator (party ref)
            - Version → dcterms:hasVersion
            - Type → dc:type
            - Associated paper(s) → ex:paper: array of nested Assets with @id, dc:title, ex:format
            - License → dcterms:license

          4. **Parties**
          - Under "party", list each party with:
            - @id, foaf:name
            - odrl:role: either odrl:assigner / odrl:assignee.

          5. **Prohibitions, Permissions and Duties**
            - **Primary/Secondary Intended Use** → one "permission" entry, action: "odrl:use".
            - **Out‑of‑scope / Prohibited Uses** → one "prohibition" entry, same action.
            - Map **Factors**, **Evaluation**, **Metrics**, **Training Data**, **Ethical Considerations**, **Caveats and Recommendations**, under "duty" (action "odrl:inform").
            - For each, create an object whose "constraint":
              - leftOperand = appropriate ex: term.
              - operator
              - rightOperand. **Do not** combined multiple rightOperand values into a list. Instead, use nested contraints, like odrl:and, odrl:or, odrl:xor
            - Use odrl:and / odrl:or / odrl:xor to combine multiple discrete uses.
            - **Split** any multi‑clause description into individual bullet‑style terms.
            - **Map** each clause to a concise phrase for the rightOperand.

          6. **External Resources & Rich‑Fields**
            - If exists "richFields" in model card JSON, under "target", there must be a "hasResource" property that includes:
              - **Images** → treat as odrl:Asset with @id = image URL, ex:format, optional ex:thumbnail.
              - **Embedded JSON tables** → treat as TableData assets with @id, ex:format: application/json, and inline the array of row objects under "ex:content".
            - If not exists "richFields", skip

          7. **Custom Vocabulary**
            - Use appropriate vocabulary starting with ex: for leftOperand

          8. **Final Output**
            - Emit **only** the **JSON‑LD policy**—no commentary or extra text.
            - Ensure every field, IRI, and nested object is valid JSON‑LD.
          `,
        },
        { role: "user", content: data },
      ],
      response_format: { type: "json_object" },
    });

    const odrl = parseCompletion.choices[0].message.content;
    const jsonOdrl = JSON.stringify(odrl, null, 2);

    const updateModelCard = await ModelCard.findByIdAndUpdate(
      id,
      {
        odrl: jsonOdrl,
        isOdrlUpdate: true,
      },
      { new: true }
    );

    res.json(updateModelCard);
  } catch (error) {
    console.error(error);
  }
};
