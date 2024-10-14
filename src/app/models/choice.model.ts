import {Answer} from "./answer.model";

export interface Choice {
    id?: bigint
    option: string
    answers: Answer[]
}