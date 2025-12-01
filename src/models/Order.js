/**
 * @swagger
 * components:
 *   schemas:
 *     Item:
 *       type: object
 *       properties:
 *         productId:
 *           type: number
 *           description: ID do produto após mapeamento.
 *         quantity:
 *           type: number
 *           description: Quantidade do item.
 *         price:
 *           type: number
 *           description: Preço do item.
 *     Order:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: ID gerado pelo MongoDB.
 *         orderId:
 *           type: string
 *           description: O ID de pedido do sistema de origem.
 *         value:
 *           type: number
 *           format: float
 *         creationDate:
 *           type: string
 *           format: date-time
 *         items:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Item'
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 */

const mongoose = require('mongoose');

// Sub-Schema para os itens do pedido
const ItemSchema = new mongoose.Schema({
    productId: { type: Number, required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
});

const OrderSchema = new mongoose.Schema({
    // orderId deve ser único para prevenir duplicação de pedidos.
    orderId: { type: String, required: true, unique: true },
    value: { type: Number, required: true },
    creationDate: { type: Date, required: true },
    items: [ItemSchema],
}, {
    // Adiciona timestamps de criação (createdAt) e atualização (updatedAt)
    timestamps: true
});

module.exports = mongoose.model('Order', OrderSchema);