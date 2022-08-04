import { AuthentificationType } from "../enums/authentification.enum"

export interface User {
    email: string,
    password: string,
    first_name: string,
    last_name: string,
    date_of_birth: string,
    sightings?: number;
}

export interface AuthentificationPost {
    user: any,
    auth_type: AuthentificationType
};