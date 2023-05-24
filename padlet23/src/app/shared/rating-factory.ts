import {Rating} from "./rating";

export class RatingFactory {
  static empty(): Rating {
    return new Rating(0, 0, 0);
  }

  static fromObject(rawRating: any): Rating {
    return new Rating(
      rawRating.user_id,
      rawRating.entrie_id,
      rawRating.rating
    );
  }
}
