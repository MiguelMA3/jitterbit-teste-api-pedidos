const Order = require('../models/Order');

/**
 * Função responsável por transformar/mapear o JSON de entrada da Jitterbit
 * para o formato do banco de dados (MongoDB/Mongoose).
 */
const mapIncomingOrder = (body) => {
    const mappedItems = body.items.map(item => ({
        // Mapeamento: 'idItem' (string) é convertido para 'productId' (Number)
        productId: parseInt(item.idItem, 10),
        quantity: item.quantidadeltem,
        price: item.valorltem
    }));

    return {
        orderId: body.numeroPedido,
        // Mapeamento: Usa colchetes para acessar 'valor Total' com espaço.
        value: body['valor Total'],
        // Mapeamento: Converte a string de data para o objeto Date do Mongoose/ISO.
        creationDate: new Date(body.dataCriacao),
        items: mappedItems,
    };
};

exports.createOrder = async (req, res) => {
    try {
        // 1. Aplica o mapeamento obrigatório antes de salvar
        const orderData = mapIncomingOrder(req.body);

        const newOrder = new Order(orderData);
        await newOrder.save();

        return res.status(201).json({ message: "Pedido criado com sucesso.", data: newOrder });
    } catch (error) {
        // 2. Tratamento de erro específico para chave duplicada (orderId).
        if (error.code === 11000) {
            return res.status(400).json({ message: "Erro: Pedido com este ID já existe.", error: error.message });
        }
        // 3. Tratamento para outros erros (ex: falha de conexão com DB, validação)
        return res.status(500).json({ message: "Erro interno do servidor.", error: error.message });
    }
};

exports.getOrderById = async (req, res) => {
    try {
        const order = await Order.findOne({ orderId: req.params.orderId });

        if (!order) {
            return res.status(404).json({ message: "Pedido não encontrado." });
        }

        return res.status(200).json(order);
    } catch (error) {
        return res.status(500).json({ message: "Erro interno do servidor.", error: error.message });
    }
};

exports.listAllOrders = async (req, res) => {
    try {
        const orders = await Order.find({});
        return res.status(200).json(orders);
    } catch (error) {
        return res.status(500).json({ message: "Erro interno do servidor.", error: error.message });
    }
};

exports.updateOrder = async (req, res) => {
    try {
        const orderData = mapIncomingOrder(req.body);

        const updatedOrder = await Order.findOneAndUpdate(
            { orderId: req.params.orderId },
            orderData,
            { new: true, runValidators: true }
        );

        if (!updatedOrder) {
            return res.status(404).json({ message: "Pedido não encontrado para atualização." });
        }

        return res.status(200).json({ message: "Pedido atualizado com sucesso.", data: updatedOrder });

    } catch (error) {
        return res.status(500).json({ message: "Erro interno do servidor.", error: error.message });
    }
};

exports.deleteOrder = async (req, res) => {
    try {
        const deletedOrder = await Order.findOneAndDelete({ orderId: req.params.orderId });

        if (!deletedOrder) {
            return res.status(404).json({ message: "Pedido não encontrado para exclusão." });
        }

        // 1. Retorna status 204 (No Content) para indicar sucesso na exclusão sem corpo de resposta.
        return res.status(204).send();
    } catch (error) {
        return res.status(500).json({ message: "Erro interno do servidor.", error: error.message });
    }
};