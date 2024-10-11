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
     *     description: Criar um novo usuário no sistema
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
     *                 example: "john_doe"
     *               email:
     *                 type: string
     *                 example: "john@example.com"
     *               password:
     *                 type: string
     *                 example: "P@ssw0rd!"
     *     responses:
     *       200:
     *         description: Usuário criado com sucesso
     *       400:
     *         description: |
     *           Erros possíveis:
     *           - Email already exists
     *           - Invalid Email format
     *           - Invalid Password format
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
     *                 example: "john@example.com"
     *               password:
     *                 type: string
     *                 example: "P@ssw0rd!"
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
     *       400:
     *         description: |
     *           Erros possíveis:
     *           - Invalid Email format
     *           - Invalid Password format
     */
    this.router.post('/auth-user', this.userController.authUser.bind(this.userController));

    return this.router;
  }
}

export { UserRoutes };
