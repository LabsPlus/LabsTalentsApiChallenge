import { Request, Response, NextFunction  } from "express";
import { UserServices } from "../services/user.service";
class UserControllers {
    private readonly userServices: UserServices
    constructor(){
        this.userServices = new UserServices();
    }
    async getUser(request: Request, response: Response, next: NextFunction){
        const {email} = request.body;
        const result = await this.userServices.getUsers();
        return response.status(200).json(result);
    }

}

export {UserControllers};