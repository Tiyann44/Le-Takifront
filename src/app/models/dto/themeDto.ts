export class ThemeDto {
    id?: bigint;
    name: string;
    description: string;


    constructor(name: string,description: string, id?: bigint) {
        this.id = id;
        this.name = name;
        this.description = description;
    }
}
