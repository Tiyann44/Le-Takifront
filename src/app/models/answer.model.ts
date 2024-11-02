import {Question} from "./question.model";
import {Choice} from "./choice.model";

export interface Answer {
    id?: bigint;
    question: Question;
    choice: Choice;
    questionId?: bigint;
    choiceId?: bigint;
    isCorrect: boolean;
    choices?: Choice[];
}