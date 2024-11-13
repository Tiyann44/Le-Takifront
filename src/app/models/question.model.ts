import {Quiz} from "./quiz.model";
import {Answer} from "./answer.model";
import {Choice} from "./choice.model";

export interface Question {
  id?: number
  question: string
  quizId : number | null
  image?: string | null
  quiz?: Quiz
  quizName?: string
  answers: Answer[]
  filteredChoices?: { answerId: number; choices: Choice[] }[];
}
