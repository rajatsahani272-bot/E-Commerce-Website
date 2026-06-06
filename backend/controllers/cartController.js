import Cart from '../models/Cart.js';



// Add item to Cart
export const addToCart = async (req, res) => {
    try {
        const { userId, productId } = req.body;

        if (!userId || !productId) {
            return res.status(400).json({
                success: false,
                message: "UserId and ProductId are required"
            });
        }

        let cart = await Cart.findOne({ userId });

        if (!cart) {

            cart = await Cart.create({
                userId,
                items: [
                    {
                        productId,
                        quantity: 1
                    }
                ]
            });

        } else {

            const existingItem = cart.items.find(
                (item) =>
                    item.productId.toString() === productId
            );

            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cart.items.push({
                    productId,
                    quantity: 1
                });
            }

            await cart.save();
        }


        return res.status(200).json({
            success: true,
            message: "Item added to cart successfully",
            cart
        });


    } catch (error) {

        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });

    }
};
// Remove item from Cart
export const removeItem=async (req, res)=>{
    try{
        const {userId ,productId}=req.body;
        const cart=await Cart.findOne({userId});
        if(!cart){
            return res.status(404).json({message:"Cart Not Found"});
        }
        cart.items=cart.items.filter(
            i=>i.productId.toString()!==productId
        );
        await cart.save();
        res.json({
            message:"Item removed from cart",
            cart
        });
    }catch(error){
        res.status(500).json({message:'Server Error while removing item',error});
    }
}

// Update item quality
export const updateQuantity=async (req, res)=>{
    try{
        const {userId, productId,quantity}=req.body;
        const cart=await Cart.findOne({userId});
        if(!cart){
            return res.status(404).json({message:'Cart not found'});
        }
        const item=cart.items.find(
            i=>i.productId.toString()===productId
        );
        if(!item){
            return res.status(404).json({message:'Item not fond in Cart'})
        }
        item.quantity=quantity;
        await cart.save();
        res.json({
            message:"Item quantity updated",
            cart
        });
        
    }catch(error){
        res.status(500).json({message:'Server Error while updating  item',error});
    }
}

// Get Cart by UserId
export const getCart=async (req,res)=>{
    try{
        const {userId}=req.params;
        const cart=await Cart.findOne({userId}).populate('items.productId');
        res.json(cart);
        
    }catch(error){
        res.status(500).json({message:"Server Error while requesting userId "});
    }
}