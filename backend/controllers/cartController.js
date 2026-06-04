import Cart from '../models/Cart.js';



// Add item to Cart
export const addToCart=async(req, res)=>{
    try{
        const {userId, productId}=req.body;
        let cart =await Cart.findOne({userId});
        if(!cart){
            cart=new Cart({userId,items:[
                {productId,quantity:1}
            ]});
        }else{
            const item=cart.items.find(
                i=>i.productId.toString()===productId
            );
             if(item){
            item.quantity+=1;
        }else{
            cart.items.push({productId,quantity:1})
        }
        }
        
        await cart.save();
        res.json({
            message:'Items added to cart',
            cart
        })
    }catch(error){
        res.status(500).json({message:'Server Error while adding item to cart',error});
    }
}

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