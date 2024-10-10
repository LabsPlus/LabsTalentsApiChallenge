import swaggerJSDoc from 'swagger-jsdoc';

const PORT = process.env.PORT ? parseInt(process.env.PORT) : 3003;

const options: swaggerJSDoc.Options = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'API Labs Talents',
      version: '1.0.0',
      description: `Esta API é responsável por gerenciar os usuários da aplicação labstalents.
      Utiliza TypeScript, Jest para testes, Express como framework,
      Swagger para documentação.`,
    },
    servers: [
      {
        "url": `http://localhost:${PORT}`,
        "description": "Servidor Local"
      }
    ],
  },
  apis: ['./src/routes/*.ts'],
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;