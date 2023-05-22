import {Userright} from "./userright";

export class UserrightFactory {
  static empty(): Userright {
    return new Userright(0, 0, 0, false, false, false, false)
  }

  static fromObject(rawUserright: any): Userright {
    return new Userright(
      rawUserright.id,
      rawUserright.padlet_id,
      rawUserright.user_id,
      rawUserright.read,
      rawUserright.write,
      rawUserright.edit,
      rawUserright.del
    )
  }
}
