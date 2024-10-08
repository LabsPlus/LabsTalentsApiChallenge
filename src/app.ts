import 'express-async-errors';
import express, { Application } from 'express';
import { UserRoutes } from './routes/user.routes';
import { errorMiddleware } from './middlewares/error.middlewares';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './swagger';
import { CorsMiddleware } from './server';

export class App {
  private app: Application;

  constructor(corsConfig: CorsMiddleware) {
    this.app = express();
    this.middleware(corsConfig);
    this.setupAllRoutes();
  }

  listen(port: number) {
    this.app.listen(port, () => {
      console.log(`Servidor rodando na porta ${port}`);
    });
    this.app.use(errorMiddleware);
  }
   private setupUserRoutes() {
    const userRoutes = new UserRoutes();
    const userBaseRoute = '/user';

    
    this.app.use(userBaseRoute, userRoutes.postRoutes());

  
  }


  
  private setupAllRoutes() {
    this.setupUserRoutes();
    this.setupSwagger();
    
  }

  
  private setupSwagger() {
    this.app.use(
      '/documentation',
      swaggerUi.serve,
      swaggerUi.setup(swaggerSpec),
    );
  }

  private middleware(corsConfig: CorsMiddleware) {
    this.app.use(express.json());
    this.app.use(corsConfig);
    this.app.use(express.urlencoded({ extended: true }));
   
  }
}