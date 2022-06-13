export interface MultipleChoice {

}
export interface IQuestion {
    id: string;
    question: string;
    multipleChoice : MultipleChoice;
    answer: number;
    time: string;
}
