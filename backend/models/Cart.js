import mongoose from 'mongoose';
import product from './product.js';


const CartSchema= new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
        
    },
    items:[
        {
            productId:{
                type:mongoose.Schema.Types.ObjectId,
                re:'Product',
                required:true
            },
            quantity:{
                type:Number,
                default:1
            }
        }
    ]
});

export default mongoose.model('Cart',CartSchema);
