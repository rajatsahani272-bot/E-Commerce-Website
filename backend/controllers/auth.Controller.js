import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';





//Signup User
export const signupUser = async (req , res) =>{
    try{
        const {name, email, password}=req.body;
        // check if user already exists
        const userExist=await User.findOne({email});
        if(userExist){
            return res.status(400).json({message:"User already exits"});
        }
        //Hash Password
        const hashPassword=await bcrypt.hash(password,10);
        
        //Create User
        await  User.create({
            name,
            email,
            password:hashPassword
        });
        res.json({message:"User registred successfully"});
    }catch(error){
        res.status(500).json({message:"Server error"}, error);
    }
};

//Login User
export const loginUser=async (req, res)=>{
    try{
        const {name , password}=req.body;
        
         // check if user already exists
        const user=await User.findOne({email});
        if(!user){
            return res.status(400).json({message:"User not found Please create account "});
        }
        // Compare password
        const match=await bcrypt.compare(password, user.password);
        if(!match){
            return res.status(400).json({message:"Invalid credentials"});
        }
        //Genrate JWT Token
        const token =jwt.sign(
            {userId:user._id,email:user.email},
            process.env.JWT_SECRET,
            {expiresIn:"1h"}
            
        )
    }catch(error){
         res.status(500).json({message:"Server error"}, error);
    }
};

