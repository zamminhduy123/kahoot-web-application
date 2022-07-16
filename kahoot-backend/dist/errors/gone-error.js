"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const custom_error_1 = __importDefault(require("./custom-error"));
const http_status_codes_1 = require("http-status-codes");
class GoneError extends custom_error_1.default {
    constructor(message) {
        super(message);
        this.statusCode = http_status_codes_1.StatusCodes.GONE;
    }
}
exports.default = GoneError;
//# sourceMappingURL=gone-error.js.map