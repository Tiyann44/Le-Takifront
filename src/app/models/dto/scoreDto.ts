export class ScoreDto {
    id?: number;
    quizId: number;
    userId: number;
    score: number;
    message: string;


    constructor(message: string, score: number, quizId: number, userId: number, id?: number) {
        this.id = id;
        this.userId = userId;
        this.quizId = quizId;
        this.message = message;
        this.score = score;
    }
}
