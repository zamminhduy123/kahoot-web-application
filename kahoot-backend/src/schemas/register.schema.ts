import { JSONSchemaType } from "ajv";

interface IRegisterSchema {
  email: string;
  name: string;
  password: string;
}

const schema: JSONSchemaType<IRegisterSchema> = {
  type: "object",
  properties: {
    email: {
      type: "string",
    },
    name: {
      type: "string",
    },
    password: {
      type: "string",
    },
  },
  required: ["email", "password", "name"],
  additionalProperties: false,
};

export default schema;
