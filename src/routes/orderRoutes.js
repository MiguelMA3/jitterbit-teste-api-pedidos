const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

/**
 * @swagger
 * tags:
 * name: Orders
 * description: Gerenciamento de Pedidos (CRUD)
 */

/**
 * @swagger
 * /order:
 * post:
 * summary: Cria um novo pedido com mapeamento de dados
 * tags: [Orders]
 * requestBody:
 * required: true
 * content:
 * application/json:
 * schema:
 * type: object
 * properties:
 * numeroPedido:
 * type: string
 * example: v10089016vdb-01
 * valor Total:
 * type: number
 * example: 10000
 * dataCriacao:
 * type: string
 * format: date-time
 * example: 2023-07-19T12:24:11.5299601+00:00
 * items:
 * type: array
 * items:
 * type: object
 * properties:
 * idItem:
 * type: string
 * example: 2434
 * quantidadeltem:
 * type: number
 * example: 1
 * valorltem:
 * type: number
 * example: 1000
 * responses:
 * 201:
 * description: Pedido criado com sucesso.
 * 400:
 * description: Erro de validação ou ID duplicado.
 */
router.post('/', orderController.createOrder);

/**
 * @swagger
 * /order/{orderId}:
 * get:
 * summary: Obtém um pedido pelo ID
 * tags: [Orders]
 * parameters:
 * - in: path
 * name: orderId
 * schema:
 * type: string
 * required: true
 * description: ID do pedido a ser obtido
 * responses:
 * 200:
 * description: Pedido encontrado.
 * 404:
 * description: Pedido não encontrado.
 */
router.get('/:orderId', orderController.getOrderById);

/**
 * @swagger
 * /order/list:
 * get:
 * summary: Lista todos os pedidos registrados
 * tags: [Orders]
 * responses:
 * 200:
 * description: Retorna uma lista de todos os pedidos.
 * content:
 * application/json:
 * schema:
 * type: array
 * items:
 * $ref: '#/components/schemas/Order'
 * 500:
 * description: Erro interno do servidor.
 */
router.get('/list', orderController.listAllOrders);

/**
 * @swagger
 * /order/{orderId}:
 * put:
 * summary: Atualiza um pedido existente pelo ID
 * tags: [Orders]
 * parameters:
 * - in: path
 * name: orderId
 * schema:
 * type: string
 * required: true
 * description: ID do pedido a ser atualizado (ex: v10089016vdb-01)
 * requestBody:
 * required: true
 * content:
 * application/json:
 * schema:
 * type: object
 * description: Deve seguir o mesmo formato de entrada do POST.
 * responses:
 * 200:
 * description: Pedido atualizado com sucesso.
 * 404:
 * description: Pedido não encontrado para atualização.
 * 500:
 * description: Erro interno do servidor.
 */
router.put('/:orderId', orderController.updateOrder);

/**
 * @swagger
 * /order/{orderId}:
 * delete:
 * summary: Exclui um pedido pelo ID
 * tags: [Orders]
 * parameters:
 * - in: path
 * name: orderId
 * schema:
 * type: string
 * required: true
 * description: ID do pedido a ser excluído (ex: v10089016vdb-01)
 * responses:
 * 204:
 * description: Pedido excluído com sucesso (No Content).
 * 404:
 * description: Pedido não encontrado.
 * 500:
 * description: Erro interno do servidor.
 */
router.delete('/:orderId', orderController.deleteOrder);

module.exports = router;