import {User} from "./user.model";
import {Quiz} from "./quiz.model";

export interface Score {
  id?: Number
  quizId: Number
  userId: Number
  score: Number
  message: string
  Quiz?: Quiz
  User?: User
}
