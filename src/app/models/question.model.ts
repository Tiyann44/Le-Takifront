import {Quiz} from "./quiz.model";
import {Answer} from "./answer.model";

export interface Question {
  id?: bigint
  question: string
  quiz: Quiz
  answers: Answer[]
}