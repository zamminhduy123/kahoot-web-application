"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const GameSchema = new mongoose_1.Schema({
    owner: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "Please provide user id"],
    },
    title: {
        type: String,
        required: [true, "Please provide quiz name"],
    },
    game: [
        {
            question: {
                type: String,
                required: [true, "Please provide question"],
            },
            answer: {
                type: Number,
                required: [true, "Please provide answer index"],
            },
            solution: [
                {
                    type: String,
                    required: [true, "Please provide all solution description"],
                },
            ],
        },
    ],
});
GameSchema.index({ owner: 1 });
exports.default = (0, mongoose_1.model)("Game", GameSchema);
//# sourceMappingURL=Game.model.js.map