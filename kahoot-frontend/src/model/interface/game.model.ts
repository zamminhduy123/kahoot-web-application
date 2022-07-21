import { IQuestion } from "./question.model";

export interface Game {
    _id: string;
    owner: string;
    title: string;
    questionList: IQuestion[];
}