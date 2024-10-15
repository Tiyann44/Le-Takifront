import { Quiz } from "./quiz.model"

export interface Theme {
id: bigint
name: string
description : string
quizzes: Quiz[]

}
