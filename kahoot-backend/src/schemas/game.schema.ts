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
    timeUp: {
      type: "integer",
      default: 10,
    },
    image: {
      type: "string",
      nullable: true,
    }
  },
  required: ["answer", "question", "solution"],
  additionalProperties: true,
};

const schema: JSONSchemaType<IGameKahoot> = {
  type: "object",
  properties: {
    game: {
      type: "array",
      items: questionSchema,
      minItems: 1,
    },
    title: {
      type: "string",
    }
  },
  required: ["game", "title"],
  additionalProperties: false,
};

export default schema;
