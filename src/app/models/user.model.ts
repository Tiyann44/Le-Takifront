import {Score} from "./score.model";

export interface User {
  id: bigint
  firstName: string
  lastName: string
  email : string
  isAdmin : boolean
  scores : Score[]
}
