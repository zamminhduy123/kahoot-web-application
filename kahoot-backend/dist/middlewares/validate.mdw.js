"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ajv_1 = __importDefault(require("ajv"));
function default_1(schema) {
    return function validate(req, res, next) {
        const ajv = new ajv_1.default();
        const valid = ajv.validate(schema, req.body);
        if (!valid) {
            return res.status(400).json(ajv.errors);
        }
        next();
    };
}
exports.default = default_1;
//# sourceMappingURL=validate.mdw.js.map