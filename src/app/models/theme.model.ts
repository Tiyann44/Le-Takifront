import { Quiz } from "./quiz.model"

export interface Theme {
id: bigint
name: string
desciption : string
quizzes: Quiz[]

}
