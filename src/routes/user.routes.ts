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
        /** 
    * @swagger
    * /user/auth-user:
    *   post:
    *     summary: Fazer autenticação e login dos usuarios
    *     description: Fazer autenticação e login dos usuarios
    *     tags:
    *       - Login User
    *     requestBody:
    *       required: true
    *       content:
    *         application/json:
    *           schema:
    *             type: object
    *             properties:
    *               email:
    *                 type: string
    *               password:
    *                 type: string
    *     responses:
    *       '200':
    *         description: Login feito com sucesso
    *       401:
    *         description: |
    *           Erros possíveis:
    *           - Invalid email
    *           - Invalid password
    *           - There is no token key
    *           - There is no refresh token key
    */
        this.router.post('/auth-user', this.userController.authUser.bind(this.userController));
         return this.router;
     }
}

export {UserRoutes};
