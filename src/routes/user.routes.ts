import {Router} from 'express';
import {UserControllers} from '../controllers/user.controller';

class UserRoutes {

    private readonly router: Router;
    private readonly userController: UserControllers;

    constructor() {
        this.router = Router();
        this.userController = new UserControllers();
    }

    
    postRoutes() {
        this.router.post('/auth-user', this.userController.authUser.bind(this.userController));
         return this.router;
     }
}

export {UserRoutes};
