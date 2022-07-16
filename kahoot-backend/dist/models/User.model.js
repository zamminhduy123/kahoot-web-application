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
const mongoose_1 = require("mongoose");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const UserSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, require: true },
    avatar: { type: String },
    refreshToken: { type: String },
}, {
    timestamps: true,
});
UserSchema.methods.hashPassword = function () {
    return __awaiter(this, void 0, void 0, function* () {
        const salt = yield bcryptjs_1.default.genSalt(10);
        this.password = yield bcryptjs_1.default.hash(this.password, salt);
    });
};
UserSchema.methods.comparePassword = function (candidatePassword) {
    return __awaiter(this, void 0, void 0, function* () {
        const isMatch = yield bcryptjs_1.default.compare(candidatePassword, this.password);
        return isMatch;
    });
};
UserSchema.methods.createJWT = function () {
    return jsonwebtoken_1.default.sign({
        userId: this._id,
        name: this.name,
    }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_LIFETIME,
    });
};
UserSchema.methods.createRefreshToken = function () {
    return __awaiter(this, void 0, void 0, function* () {
        const token = jsonwebtoken_1.default.sign({ userId: this._id }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_REFRESHTOKEN_LIFETIME, //1 day
        });
        this.refreshToken = token;
        yield this.save();
        return token;
    });
};
UserSchema.methods.compareRefreshToken = function (candidateToken) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const token = jsonwebtoken_1.default.verify(this.refreshToken, process.env.JWT_SECRET);
            return candidateToken === this.refreshToken;
        }
        catch (error) {
            return false;
        }
    });
};
UserSchema.index({ email: 1 }, { unique: true });
exports.default = (0, mongoose_1.model)("User", UserSchema);
//# sourceMappingURL=User.model.js.map