// arquitectura pequeña para aplicaciones pequeños. los handlers vienen siendo lo mismo que los controllers.
import User from "../models/Usuario";
import type { Request, Response } from "express";
import { checkPassword, hashpassword } from "../utils/auth";
import slug from "slug";
import { validationResult } from "express-validator";
import { handleInputError } from "../middlewares/validation";
import { generateJWT } from "../utils/jwt";

// asignandole el type nativo de request y response.
export const CreateAccount = async (req: Request, res: Response) => {

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
    const token = generateJWT({ id: user.id });

    res.send(token);


}

export const getUser = async (req: Request, res: Response) => {
    res.json(req.user);
}

export const updateProfile = async (req: Request, res: Response)=>{
    try {
        const {description} = req.body;
        const handle = slug(req.body.handle, '');
        const handleExist = await User.findOne({handle});
        // si es un handle existente y es un correo diferente al que esta actualizando
        if(handleExist && handleExist.email !== req.user.email){
            const error = new Error('El handle ya existe');
            return res.status(409).json({msg: error.message});
        }
        // actualizar datos del usuario.
        req.user.description = description;
        req.user.handle = handle;

        // guardar
        await req.user.save();
        res.send('perfil actualizado correctamente')

    } catch (e) {
        const error = new Error('Hubo un error');
        return res.status(500).json({msg: error.message});
    }
}