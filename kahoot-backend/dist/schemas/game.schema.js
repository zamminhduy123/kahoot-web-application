"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const questionSchema = {
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
const schema = {
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
exports.default = schema;
//# sourceMappingURL=game.schema.js.map