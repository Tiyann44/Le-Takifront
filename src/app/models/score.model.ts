import {User} from "./user.model";
import {Quiz} from "./quiz.model";

export interface Score {
  id?: number
  quizId: Number
  userId: number
  score: Number
  message: string
  Quiz?: Quiz
  User?: User
}
