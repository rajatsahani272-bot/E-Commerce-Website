import Product from "../models/product.js";



// Create a new Product

export const createProduct = async (req, res) => {
    try {
        const product = await Product.create(req.body);
        res.json({
            message: "Product created successfully",
            product,
        });
    } catch (error) {
        res.status(500).json({ message:"Sever error at adding product"});
    }
}

// Get all products
export const getProducts = async (req, res) => {
    try {
        const { search, category } = req.query;

        let filter = {};
        
        
        
        if(search){
            filter.title = {
                $regex: search,
                $options: "i"
            };
        }

        if(category){
            filter.category = {
                $regex: category,
                $options: "i"
            };
        }

        const products = await Product
            .find(filter)
            .sort({ createdAt: -1 });

        res.json(products);

    } catch(error){
        res.status(500).json({
            message:"Server Error",
            error
        });
    }
};

// Update a product 
export const updateProduct = async (req, res) => {
    try {
         const updated=await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new:true}
         );
         res.json({
            message:"Product updated Successfully",
            updated,
         })
         
    } catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
}

// Delete a product 

export const deleteProdcut=async (req, res)=>{
    try{
        await Product.findByIdAndDelete(req.params.id);
        res.json({message:'Product deleted successfully'});
    }catch(error){
        res.status(500).json({ message: "Server Error", error });
    }
}