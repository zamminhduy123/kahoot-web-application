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
exports.autoLogin = exports.register = exports.login = void 0;
const User_model_1 = __importDefault(require("../models/User.model"));
const http_status_codes_1 = require("http-status-codes");
const errors_1 = require("../errors");
const ErrorMessage = __importStar(require("../error-messsage"));
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const user = yield User_model_1.default.findOne({ email });
    if (!user) {
        throw new errors_1.UnauthenticatedError(ErrorMessage.ERROR_LOGIN_FAILED);
    }
    const isTruePassword = yield user.comparePassword(password);
    if (!isTruePassword) {
        throw new errors_1.UnauthenticatedError(ErrorMessage.ERROR_LOGIN_FAILED);
    }
    yield user.createRefreshToken();
    const accessToken = user.createJWT();
    const userObjToSend = Object.assign(Object.assign({}, user.toJSON()), { __v: undefined, password: undefined });
    return res.status(http_status_codes_1.StatusCodes.OK).json(Object.assign(Object.assign({}, userObjToSend), { accessToken }));
});
exports.login = login;
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = new User_model_1.default(req.body);
    yield user.hashPassword();
    yield user.createRefreshToken();
    yield user.save();
    const accessToken = user.createJWT();
    const userObjToSend = Object.assign(Object.assign({}, user.toJSON()), { __v: undefined, password: undefined });
    return res
        .status(http_status_codes_1.StatusCodes.CREATED)
        .json(Object.assign(Object.assign({}, userObjToSend), { accessToken }));
});
exports.register = register;
const autoLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId;
    const user = yield User_model_1.default.findById(userId);
    if (!user) {
        throw new errors_1.UnauthenticatedError(ErrorMessage.ERROR_LOGIN_FAILED);
    }
    yield user.createRefreshToken();
    const accessToken = user.createJWT();
    const userObjToSend = Object.assign(Object.assign({}, user.toJSON()), { __v: undefined, password: undefined });
    return res.status(http_status_codes_1.StatusCodes.OK).json(Object.assign(Object.assign({}, userObjToSend), { accessToken }));
});
exports.autoLogin = autoLogin;
//# sourceMappingURL=auth.controller.js.map