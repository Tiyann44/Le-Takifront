import {Theme} from "./theme.model"
import {Question} from "./question.model";

export interface Quiz {
    id: Number
    name: string
    description: string
    image: string
    theme: Theme
    themeId: bigint
    questions: Question[]

}
