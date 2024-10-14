import {Score} from "./score.model";

export interface User {
  firstNname: string
  lastName: string
  email : string
  isAdmin : boolean
  scores : Score[]
}
