import Order from "../models/Order.js";
import Cart from "../models/Cart.js";
import Product from "../models/product.js";


export const placeOrder = async (req, res) => {

    try {

        const { userId, address } = req.body;


        if (!userId || !address) {
            return res.status(400).json({
                success: false,
                message: "UserId and address are required"
            });
        }


        const cart = await Cart
            .findOne({ userId })
            .populate("items.productId");


        if (!cart || cart.items.length === 0) {
            return res.status(400).json({
                success: false,
                message: "Cart is empty"
            });
        }


        const orderItems = cart.items.map((item) => ({
            productId: item.productId._id,
            quantity: item.quantity,
            price: item.productId.price
        }));


        const totalAmount = orderItems.reduce(
            (total, item) =>
                total + item.price * item.quantity,
            0
        );


        for (const item of cart.items) {

            await Product.findByIdAndUpdate(
                item.productId._id,
                {
                    $inc: {
                        stock: -item.quantity
                    }
                }
            );

        }


        const order = await Order.create({
            userId,
            items: orderItems,
            address,
            totalAmount,
            paymentMethod: "COD"
        });


        await Cart.findOneAndUpdate(
            { userId },
            {
                items: []
            }
        );


        return res.status(201).json({
            success: true,
            message: "Order placed successfully",
            orderId: order._id
        });


    } catch (error) {

        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });

    }

};