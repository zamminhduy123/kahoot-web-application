export interface IQuestionSchema {
  question: string;
  solution: string[];
  answer: number;
}

export interface IGameSchema {
  game: IQuestionSchema[];
}
