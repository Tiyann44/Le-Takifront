import {User} from "./user.model";
import {Quiz} from "./quiz.model";

export interface Score {
  id?: number
  user: User
  quiz: Quiz
  score: number
  message: string
}
