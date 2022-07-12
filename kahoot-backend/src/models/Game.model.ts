import { Model, Schema, model, Types } from "mongoose";

interface IQuestion {
  question: string;
  solution: string[];
  answer: number;
}

interface IGame {
  owner: Types.ObjectId;
  game: IQuestion[];
}

interface IGameMethods {}

type GameModel = Model<IGame, {}, IGameMethods>;

const GameSchema = new Schema<IGame, GameModel, IGameMethods>({
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: [true, "Please provide user id"],
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
export default model<IGame, GameModel>("Game", GameSchema);
