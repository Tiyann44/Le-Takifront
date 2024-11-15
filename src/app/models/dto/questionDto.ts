export class QuestionDto {
    id?: bigint;
    option: string;
    quizId?: bigint;


    constructor(question: string, quizId?: bigint, id?: bigint) {
        this.id = id;
        this.option = question;
        this.quizId = quizId;
    }
}
