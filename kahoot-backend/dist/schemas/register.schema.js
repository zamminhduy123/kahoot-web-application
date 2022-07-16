"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const schema = {
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
exports.default = schema;
//# sourceMappingURL=register.schema.js.map