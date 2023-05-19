import {Comment} from "./comment";
import {Rating} from "./rating";
export {Comment} from "./comment";
export {Rating} from "./rating";
export class Entrie {
  constructor (
    public id: number,
    public user_id: number,
    public padlet_id: number,
    public title: string,
    public content: string,
    public created_at: Date,
    public comment?: Comment[],
    public rating?: Rating[]
  ){}
}
