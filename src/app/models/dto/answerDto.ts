export class AnswerDto {
  id?: bigint;
  questionId?: bigint;
  choiceId?: bigint;
  isCorrect: boolean;

  constructor(id?: bigint, questionId?: bigint, choiceId?: bigint, isCorrect: boolean = false) {
    this.id = id;
    this.questionId = questionId;
    this.choiceId = choiceId;
    this.isCorrect = isCorrect;
  }
}
