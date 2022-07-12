import { JSONSchemaType } from "ajv";
import { IGameKahoot, IQuestionKahoot } from "../types";

const questionSchema: JSONSchemaType<IQuestionKahoot> = {
  type: "object",
  properties: {
    question: {
      type: "string",
    },
    solution: {
      type: "array",
      items: {
        type: "string",
      },
      minItems: 4,
    },
    answer: {
      type: "number",
    },
  },
  required: ["answer", "question", "solution"],
  additionalProperties: false,
};

const schema: JSONSchemaType<IGameKahoot> = {
  type: "object",
  properties: {
    game: {
      type: "array",
      items: questionSchema,
      minItems: 1,
    },
  },
  required: ["game"],
  additionalProperties: false,
};

export default schema;
