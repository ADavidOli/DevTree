// arquitectura pequeña para aplicaciones pequeños. los handlers vienen siendo lo mismo que los controllers.
import User from "../models/Usuario";
import type { Request, Response } from "express";
import { checkPassword, hashpassword } from "../utils/auth";
import slug from "slug";
import { validationResult } from "express-validator";

// asignandole el type nativo de request y response.
export const CreateAccount = async (req: Request, res: Response) => {

    // validacion desde el route con express validator
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        })
    }



    const { email, password } = req.body;
    const userExists = await User.findOne({ email });

    if (userExists) {
        const error = new Error('el usuario ya esta registrado');

        return res.status(409).json({
            msg: error.message,
        })
    }
    const handle = slug(req.body.handle, '');
    const handleExists = await User.findOne({ handle });
    if (handleExists) {
        const error = new Error('nombre de usuario no disponible');

        return res.status(409).json({
            msg: error.message,
        })
    }
    // obtenemos el usuario desde el body
    const user = new User(req.body);
    // hasheamos la contraseña
    user.password = await hashpassword(password);
    // creamos un handle para cada usuario y mandarselo a su url.
    user.handle = handle;

    await user.save();

    res.status(201).json({
        msg: 'Usuario registrado correctamente'
    })

}


export const login = async (req: Request, res: Response) => {

    const { email, password } = req.body;
    const user = await User.findOne({ email });
    // verificar que el usuario ingresado no exista en la base de datos
    if (!user) {
        const error = new Error('el usuario no está registrado');

        return res.status(404).json({
            msg: error.message,
        })
    }
    //comprobando el password
    const ispasswordCorrect = await checkPassword(password, user.password);
    if (!ispasswordCorrect) {
        const error = new Error('password incorrecto');

        return res.status(401).json({
            msg: error.message,
        })
    }

    res.send('autenticado')


}