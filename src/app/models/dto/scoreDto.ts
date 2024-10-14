export class ScoreDto {
    id?: bigint;
    quizId?: bigint;
    userId?: bigint;
    score: bigint;
    message: string;


    constructor(message: string, score: bigint, quizId?: bigint, userId?: bigint, id?: bigint) {
        this.id = id;
        this.userId = userId;
        this.quizId = quizId;
        this.message = message;
        this.score = score;
    }
}
