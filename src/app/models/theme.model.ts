import { Quiz } from "./quiz.model"

export interface Theme {
    id: bigint
    name: string
    description : string
    quizzes: Quiz[]
    image?: string; // Ajout de l'image
    showQuizzes?: boolean; // Pour gérer l'affichage des quiz

}
