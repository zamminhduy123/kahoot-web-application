import { JSONSchemaType } from "ajv";

interface IQuestionSchema {
  question: string;
  solution: string[];
  answer: number;
}

interface IGameSchema {
  game: IQuestionSchema[];
}

const questionSchema: JSONSchemaType<IQuestionSchema> = {
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

const schema: JSONSchemaType<IGameSchema> = {
  type: "object",
  properties: {
    game: {
        type: "array",
        items: questionSchema,
        minItems: 1
    }
  },
  required: ["game"],
  additionalProperties: false,
};

export default schema;
