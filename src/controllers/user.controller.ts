import  {Request, Response} from 'express';
import User from "../models/user.modles";
import jsonwebtoken from "jsonwebtoken";
import { userSchema, loginSchema} from '../utils/types';
import bcrypt from 'bcrypt';
import { z } from 'zod';

export const registerUser = async (req: Request, res: Response) => {
    try {
        const userDataParsed = userSchema.parse(req.body);


        // check if user already exists
        const existingUser = await User.findOne({ email: userDataParsed.email });
        if (existingUser) {
             res.status(400).json({ message: "User already exists" });
             return;
        }

        const createdUser = await User.create({
            name: userDataParsed.name,
            email: userDataParsed.email,
            password: userDataParsed.password,
            resume: userDataParsed.resume,
            phone: userDataParsed.phone,
            linkedin: userDataParsed.linkedin,
            github: userDataParsed.github,
            website: userDataParsed.website
        }
        // slect only the fields you want to return
        , { fields: { password: 0, __v: 0 } }
   
    );
        
        res.status(201).json({ message: "User registered successfully", user: createdUser });
        return;
    } catch (error) {

        if(error instanceof z.ZodError) {
            res.status(400).json({ message: "Validation error", errors: error.errors });
            return;
        }
        console.error("Error registering user:", error);
        res.status(500).json({ message: "Internal server error" });
        return;
    }
};



export const loginUser = async (req: Request, res: Response) => {
    try {
        const userDataParsed = loginSchema.parse(req.body);
       
        const existingUser = await User.findOne({ email: userDataParsed.email });
        if (!existingUser) {
            res.status(400).json({ message: "User not found" });
            return;
        }

        const isPasswordValid = await bcrypt.compare(userDataParsed.password, existingUser.password);
        if (!isPasswordValid) {
            res.status(400).json({ message: "Invalid password" });
            return;
        }
        const token = jsonwebtoken.sign({ id: existingUser._id }, process.env.JWT_SECRET as string, { expiresIn: "1h" });

        res.header("Authorization", `Bearer ${token}`);
        res.status(200).json({ message: "User logged in successfully", token });
        return;
    } catch (error) {
        if (error instanceof z.ZodError) {
            res.status(400).json({ message: "Validation error", errors: error.errors });
            return;
        }
        console.error("Error logging in user:", error);
        res.status(500).json({ message: "Internal server error" });

        return;
    }
};