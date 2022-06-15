import { JSONSchemaType } from "ajv";

interface ILoginSchema {
  email: string;
  password: string;
}

const schema: JSONSchemaType<ILoginSchema> = {
  type: "object",
  properties: {
    email: {
      type: "string",
    },
    password: {
      type: "string",
    },
  },
  required: ["email", "password"],
  additionalProperties: false,
};

export default schema;
