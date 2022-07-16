"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.compulsoryAuth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const errors_1 = require("../errors");
const ErrorMessage = __importStar(require("../error-messsage"));
const User_model_1 = __importDefault(require("../models/User.model"));
const JWT_SECRET = process.env.JWT_SECRET;
const compulsoryAuth = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    //check header
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer")) {
        throw new errors_1.UnauthenticatedError(ErrorMessage.ERROR_AUTHENTICATION_INVALID);
    }
    const token = authHeader.split(" ")[1];
    try {
        const payload = jsonwebtoken_1.default.verify(token, JWT_SECRET);
        req.user = Object.assign({}, payload);
        next();
    }
    catch (error) {
        yield refreshAccessToken(req, token);
        next();
    }
});
exports.compulsoryAuth = compulsoryAuth;
const refreshAccessToken = (req, token) => __awaiter(void 0, void 0, void 0, function* () {
    let payload;
    try {
        payload = jsonwebtoken_1.default.verify(token, JWT_SECRET, {
            ignoreExpiration: true,
        });
    }
    catch (error) {
        throw new errors_1.UnauthenticatedError(ErrorMessage.ERROR_AUTHENTICATION_INVALID);
    }
    const user = yield User_model_1.default.findById(payload.userId);
    if (!user) {
        throw new errors_1.BadRequestError(ErrorMessage.ERROR_AUTHENTICATION_INVALID);
    }
    const refreshToken = req.headers.refresh;
    if (!user.compareRefreshToken(refreshToken)) {
        throw new errors_1.BadRequestError(ErrorMessage.ERROR_AUTHENTICATION_INVALID);
    }
    req.user.accessToken = user.createJWT();
});
//# sourceMappingURL=authentication.mdw.js.map