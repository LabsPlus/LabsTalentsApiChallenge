import { User } from "@prisma/client";
import prisma from "../db";

class UserRepository{
    
    async createUser({name,email,password} : User): Promise<User> {
        const newUser =  prisma.user.create({
            data:{
                name,
                email,
                password
            }
        })
        return newUser;

    }




}