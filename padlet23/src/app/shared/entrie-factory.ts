import { Entrie } from './entrie';
export class EntrieFactory {
  static empty(): Entrie {
    return new Entrie(0, 0, 0, '', '', new Date(), [], []);
  }

  static fromObject(rawEntrie: any): Entrie {
    return new Entrie(
      rawEntrie.id,
      rawEntrie.user_id,
      rawEntrie.padlet_id,
      rawEntrie.title,
      rawEntrie.content,
      typeof(rawEntrie.created_at) === 'string' ? new Date(rawEntrie.created_at) : rawEntrie.created_at,
      rawEntrie.comment,
      rawEntrie.rating
    );
  }
}

