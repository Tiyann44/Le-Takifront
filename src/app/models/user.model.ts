import {Score} from "./score.model";

export interface User {
  id: number
  firstName: string
  lastName: string
  mail : string
  pseudo: string
  isAdmin : boolean
  image: string
  scores : Score[]
}
