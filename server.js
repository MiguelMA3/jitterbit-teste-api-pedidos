// 1. Configura o Express e carrega as variáveis de ambiente.
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const orderRoutes = require('./src/routes/orderRoutes');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI;

// 2. Define as opções para o Swagger, apontando para os arquivos de rota.
const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Jitterbit Orders API',
            version: '1.0.0',
            description: 'API CRUD simples para gerenciamento de pedidos.',
        },
        servers: [{
            url: `http://localhost:${PORT}`,
        }],
    },

    apis: ['./src/routes/*.js'],
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
// 3. Monta a interface de documentação em /api-docs.
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use(express.json());

// 4. Conexão com o MongoDB.
mongoose.connect(MONGODB_URI)
    .then(() => console.log('Conectado ao MongoDB!'))
    // Adiciona tratamento de erro crucial no startup da aplicação
    .catch(err => {
        console.error('Erro de conexão com o MongoDB:', err);
        process.exit(1);
    });


app.use('/order', orderRoutes);

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
    console.log(`Documentação disponível em http://localhost:${PORT}/api-docs`);
});