import {Quiz} from "./quiz.model";
import {Answer} from "./answer.model";
import {Choice} from "./choice.model";

export interface Question {
  id?: bigint
  question: string
  quizId : bigint
  image?: string;
  quiz: Quiz
  quizName?: string
  answers: Answer[]
  filteredChoices?: { answerId: number; choices: Choice[] }[];
}
