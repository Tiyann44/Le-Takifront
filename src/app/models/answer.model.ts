import {Question} from "./question.model";
import {Choice} from "./choice.model";

export interface Answer {
    id?: number;
    question?: Question;
    choice: Choice;
    questionId?: number;
    choiceId?: number;
    isCorrect: boolean;
    choices?: Choice[];
}