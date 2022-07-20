export interface IQuestionSchema {
  question: string;
  solution: string[];
  answer: number;
  timeUp: number;
  image?: string;
}

export interface IGameSchema {
  title: string;
  game: IQuestionSchema[];
}
