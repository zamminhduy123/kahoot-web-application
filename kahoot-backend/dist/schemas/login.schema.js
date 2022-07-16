"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const schema = {
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
exports.default = schema;
//# sourceMappingURL=login.schema.js.map