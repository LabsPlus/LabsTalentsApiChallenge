import { Request, Response, NextFunction  } from "express";
import { UserServices } from "../services/user.service";
class UserControllers {
    private readonly userServices: UserServices
    constructor(){
        this.userServices = new UserServices();
    }
    async createUser(request: Request, response: Response, next: NextFunction){
        const {username, email, password} = request.body;
        const result = await this.userServices.createUser({username, email, password});
        return response.status(200).json(result);
    }
    async authUser(request: Request, response: Response, next: NextFunction){
        const {email, password} = request.body;
        const result = await this.userServices.authLogin({email, password});
        return response.status(200).json(result);
    }

}

export {UserControllers};