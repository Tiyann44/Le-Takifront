import {Theme} from "./theme.model"
import {Question} from "./question.model";

export interface Quiz {
    id: number | null
    name: string
    description: string
    themeName?: string
    image: string
    theme: Theme | null
    themeId: number | null
    questions?: Question[]

}
