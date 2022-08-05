export interface IUser {
    email: string,
    password: string,
    first_name: string,
    last_name: string,
    date_of_birth: string,
    sightings?: number;
}

export interface IUserProfile {
    id: number,
    first_name: string,
    last_name: string,
}

export class User {
    constructor(private email: string, private password: string, private first_name: string, private last_name: string, private date_of_birth: string, private sightings?: number){ }
}