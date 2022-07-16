import { Model, Types } from "mongoose";
interface IQuestion {
    question: string;
    solution: string[];
    answer: number;
}
interface IGame {
    owner: Types.ObjectId;
    title: string;
    game: IQuestion[];
}
interface IGameMethods {
}
declare type GameModel = Model<IGame, {}, IGameMethods>;
declare const _default: GameModel;
export default _default;
//# sourceMappingURL=Game.model.d.ts.map