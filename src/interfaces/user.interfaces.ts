export interface User{
    username: string;
    email: string;
    password: string;
}

export type IUserLogin = Pick<User, 'email' | 'password'>;
 