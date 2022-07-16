"use strict";
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
exports.getYourGames = exports.createGame = void 0;
const Game_model_1 = __importDefault(require("../models/Game.model"));
const createGame = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const owner = (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId;
    const { game, title } = req.body;
    yield Game_model_1.default.create({
        owner,
        title,
        game,
    });
    res.json({
        game,
        owner,
        title,
        accessToken: (_b = req.user) === null || _b === void 0 ? void 0 : _b.accessToken,
    });
});
exports.createGame = createGame;
const getYourGames = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _c, _d;
    const owner = (_c = req.user) === null || _c === void 0 ? void 0 : _c.userId;
    const games = yield Game_model_1.default.find({
        owner,
    });
    res.json({
        games: games,
        accessToken: (_d = req.user) === null || _d === void 0 ? void 0 : _d.accessToken,
    });
});
exports.getYourGames = getYourGames;
//# sourceMappingURL=game.controller.js.map