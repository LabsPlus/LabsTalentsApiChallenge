import { User } from "../../interfaces/user.interfaces";
import prisma from "../db";

class UserDALs{
    
    async createUser({username,email,password} : User) {
        const newUser =  prisma.user.create({
            data:{
                name: username,
                email,
                password
            }
        })
        return newUser;

    }

    async findUserByEmail(email: string){
        const result = prisma.user.findUnique({
            where: {email},
        });

        return result;
    }




}

export {UserDALs}