export class UserDto {
    id?: bigint;
    firstName: string;
    lastName: string;
    isAdmin: boolean;
    mail: string;


    constructor(mail: string, firstName: string, lastName: string, isAdmin: boolean, id?: bigint) {
        this.id = id;
        this.firstName = firstName;
        this.lastName= lastName;
        this.mail = mail;
        this.isAdmin = isAdmin;
    }
}
