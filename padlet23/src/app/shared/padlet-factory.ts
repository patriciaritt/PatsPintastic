import { Padlet } from './padlet';
export class PadletFactory {
  static empty(): Padlet {
    return new Padlet('', '', 0, true, '', new Date());
  }

  static fromObject(rawPadlet: any): Padlet {
    return new Padlet(
      rawPadlet.id,
      rawPadlet.name,
      rawPadlet.user_id,
      rawPadlet.is_public,
      rawPadlet.image,
      typeof(rawPadlet.created_at) === 'string' ? new Date(rawPadlet.created_at) : rawPadlet.created_at
    );
  }
}

