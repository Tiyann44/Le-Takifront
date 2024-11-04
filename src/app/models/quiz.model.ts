import {Theme} from "./theme.model"
import {Question} from "./question.model";

export interface Quiz {
    id: bigint
    name: string
    description: string
    themeName?: string
    image: string
    theme: Theme
    themeId: bigint
    questions: Question[]

}
