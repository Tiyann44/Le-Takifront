export class ChoiceDto {
  id?: bigint;
  option: string;


  constructor(option: string, id?: bigint) {
    this.id = id;
    this.option = option;
  }
}
