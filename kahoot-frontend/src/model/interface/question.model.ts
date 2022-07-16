export type IMultipleChoice = string[];
export interface IQuestion {
    id: string;
    question: string;
    multipleChoice : IMultipleChoice;
    answer: number;
    time: string;
}
