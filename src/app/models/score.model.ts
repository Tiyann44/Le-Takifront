import {User} from "./user.model";
import {Quiz} from "./quiz.model";

export interface Score {
  id?: bigint
  user: User
  quiz: Quiz
  score: bigint
  message: string
}
