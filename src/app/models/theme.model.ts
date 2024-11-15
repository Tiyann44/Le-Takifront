import { Quiz } from "./quiz.model"

export interface Theme {
    id: number | null
    name: string
    description : string
    quizzes: Quiz[]
    image?: string;
    showQuizzes?: boolean;

}
