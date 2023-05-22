
export class Padlet {
  constructor (
    public id: string,
    public name: string,
    public user_id: number,
    public is_public: boolean,
    public image: string,
    public created_at: Date
  ){}
}
