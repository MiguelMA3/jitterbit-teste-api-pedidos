const Order = require('../models/Order');

const mapIncomingOrder = (body) => {
  const mappedItems = body.items.map(item => ({
    productId: parseInt(item.idItem, 10),
    quantity: item.quantidadeltem,
    price: item.valorltem
  }));

  return {
    orderId: body.numeroPedido,
    value: body['valor Total'],
    creationDate: new Date(body.dataCriacao), 
    items: mappedItems,
  };
};

exports.createOrder = async (req, res) => {
  try {
    const orderData = mapIncomingOrder(req.body); 
    
    const newOrder = new Order(orderData);
    await newOrder.save();

    return res.status(201).json({ message: "Pedido criado com sucesso.", data: newOrder });
  } catch (error) {
    if (error.code === 11000) {
        return res.status(400).json({ message: "Erro: Pedido com este ID já existe.", error: error.message });
    }
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

        return res.status(204).send();
    } catch (error) {
        return res.status(500).json({ message: "Erro interno do servidor.", error: error.message });
    }
};