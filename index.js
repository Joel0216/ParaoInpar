const express = require('express');
const swaggerUi = require('swagger-ui-express');

const app = express();
const port = 3000;

// Documentación Swagger básica
const swaggerDocument = {
  openapi: '3.0.0',
  info: {
    title: 'API Par o Inpar',
    version: '1.0.0',
    description: 'API para determinar si un número es par o impar'
  },
  paths: {
    '/paroinpar': {
      get: {
        summary: 'Determina si un número es par o impar',
        parameters: [
          {
            name: 'numero',
            in: 'query',
            required: true,
            schema: { type: 'integer' },
            description: 'Número a evaluar'
          }
        ],
        responses: {
          200: {
            description: 'Resultado',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    numero: { type: 'integer' },
                    resultado: { type: 'string' }
                  }
                }
              }
            }
          },
          400: { description: 'Parámetro inválido' }
        }
      }
    }
  }
};

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get('/paroinpar', (req, res) => {
  const numero = parseInt(req.query.numero, 10);
  if (isNaN(numero) || numero < 0 || !/^\d+$/.test(req.query.numero)) {
    return res.status(400).json({ error: 'El parámetro "numero" debe ser un número entero positivo.' });
  }
  const resultado = numero % 2 === 0 ? 'par' : 'impar';
  res.json({ numero, resultado });
});

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
  console.log(`Swagger disponible en http://localhost:${port}/api-docs`);
});