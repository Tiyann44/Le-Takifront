export class QuizDto {
    id?: bigint;
    description: string;
    name: string;
    themeId?: bigint;


    constructor(description: string, name: string, themeId?: bigint, id?: bigint) {
        this.id = id;
        this.themeId = themeId;
        this.description = description;
        this.name = name;
    }
}
