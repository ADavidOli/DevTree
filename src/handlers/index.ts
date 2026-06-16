// arquitectura pequeña para aplicaciones pequeños. los handlers vienen siendo lo mismo que los controllers.
import User from "../models/Usuario";
import type { Request, Response } from "express";

// asignandole el type nativo de request y response.
export const CreateAccount = async (req: Request, res: Response) => {
    const { email } = req.body;
    const userExists = await User.findOne({ email });

    if (userExists) {
        const error = new Error('el usuario ya esta registrado');
        
        return res.status(409).json({
            msg: error.message,
        })
    } else {
        const user = new User(req.body);
        await user.save();

        res.status(201).json({
            msg: 'Usuario registrado correctamente'
        })
    }
}