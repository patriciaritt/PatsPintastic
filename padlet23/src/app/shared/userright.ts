export class Userright {
  constructor(
    public id: number,
    public padlet_id: number,
    public user_id: number,
    public read: boolean,
    public write: boolean,
    public edit: boolean,
    public del: boolean
  ) {
  }
}
