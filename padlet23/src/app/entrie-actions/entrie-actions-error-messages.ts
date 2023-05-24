export class ErrorMessageEntrie {
  constructor(public forControl: string, public forValidator: string, public text: string) {

  }
}
export const EntrieActionsErrorMessages = [
  new ErrorMessageEntrie('title', 'required', 'A Pin needs a title!'),
  new ErrorMessageEntrie('image', 'required', 'You have to insert an image link for the Pin!'),
];
