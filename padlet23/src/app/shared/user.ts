import {Userright} from "./userright";
export {Userright} from "./userright";

export class User {
  constructor (
    public id: number,
    public firstName: string,
    public lastName: string,
    public email: string,
    public image: string,
    public userrights?: Userright[]
  ){}
}
