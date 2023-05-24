export class ErrorMessage {
  constructor(public forControl: string, public forValidator: string, public text: string) {

  }
}

export const PadletActionsErrorMessages = [
  new ErrorMessage('name', 'required', 'A Padlet needs a name!'),
  new ErrorMessage('image', 'required', 'You have to insert an image link!'),
];
