import { Router } from 'express';
import { UserControllers } from '../controllers/user.controller';

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
     * /user/create-user:
     *   post:
     *     summary: Criar usuário no sistema
     *     description: Criar usuário no sistema
     *     tags:
     *       - Create User
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               username:
     *                 type: string
     *               email:
     *                 type: string
     *               password:
     *                 type: string
     *     responses:
     *       200:
     *         description: Created user with sucess
     *       400:
     *         description: Email already exists
     */
    this.router.post('/create-user', this.userController.createUser.bind(this.userController));

    /** 
     * @swagger
     * /user/auth-user:
     *   post:
     *     summary: Fazer autenticação e login dos usuários
     *     description: Fazer autenticação e login dos usuários
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
     *       200:
     *         description: Login feito com sucesso
     *       404:
     *         description: |
     *           Erros possíveis:
     *           - Invalid email
     *           - Invalid password
     *       401:
     *         description: |
     *           Erros possíveis:
     *           - There is no token
     *           - There is no refresh token
     */
    this.router.post('/auth-user', this.userController.authUser.bind(this.userController));

    return this.router;
  }
}

export { UserRoutes };
