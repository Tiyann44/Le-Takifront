import {Theme} from "./theme.model"
import {Question} from "./question.model";

export interface Quiz {
    id: number
    name: string
    description: string
    themeName?: string
    image: string
    theme: Theme
    themeId: number
    questions: Question[]

}
