import express from 'express';
import{
    addToCart,
    removeItem,
    updateQuantity,
    getCart
} from "../controllers/cartController.js";


const router=express.Router();

//  Add itemm to cart
router.post('/add',addToCart);

// Remove item to cart
router.post('/remove',removeItem);

// Update item to cart
router.post('/update',updateQuantity);

// Get user'cart 
router.get('/:userId',getCart);

export default router;