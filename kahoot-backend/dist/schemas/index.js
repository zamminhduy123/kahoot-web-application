"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.gameSchema = exports.registerSchema = exports.loginSchema = void 0;
const login_schema_1 = __importDefault(require("./login.schema"));
exports.loginSchema = login_schema_1.default;
const register_schema_1 = __importDefault(require("./register.schema"));
exports.registerSchema = register_schema_1.default;
const game_schema_1 = __importDefault(require("./game.schema"));
exports.gameSchema = game_schema_1.default;
//# sourceMappingURL=index.js.map