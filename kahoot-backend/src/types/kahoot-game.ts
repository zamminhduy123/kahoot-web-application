export interface IQuestionSchema {
  question: string;
  solution: string[];
  answer: number;
  timeUp: number;
}

export interface IGameSchema {
  title: string;
  game: IQuestionSchema[];
}
