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