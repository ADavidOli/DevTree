// arquitectura pequeña para aplicaciones pequeños. los handlers vienen siendo lo mismo que los controllers.
import User from "../models/Usuario";
import type { Request, Response } from "express";
import { checkPassword, hashpassword } from "../utils/auth";
import slug from "slug";
import { Result, validationResult } from "express-validator";
import { handleInputError } from "../middlewares/validation";
import { generateJWT } from "../utils/jwt";
import cloudinary from "../config/cloudinary";
import formidable from 'formidable';
import { v4 as uuid } from 'uuid';

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

export const updateProfile = async (req: Request, res: Response) => {
    try {
        const { description, links } = req.body;
        const handle = slug(req.body.handle, '');
        const handleExist = await User.findOne({ handle });
        // si es un handle existente y es un correo diferente al que esta actualizando
        if (handleExist && handleExist.email !== req.user.email) {
            const error = new Error('El handle ya existe');
            return res.status(409).json({ msg: error.message });
        }
        // actualizar datos del usuario.
        req.user.description = description;
        req.user.handle = handle;
        req.user.links = links;

        // guardar
        await req.user.save();
        res.send('perfil actualizado correctamente')

    } catch (e) {
        const error = new Error('Hubo un error');
        return res.status(500).json({ msg: error.message });
    }
}



export const uploadImage = async (req: Request, res: Response) => {
    // subir imagenes 
    const form = formidable({ multiples: false });
    try {
        // preparando objeto reques para la subida de archivos
        form.parse(req, (error, fields, files) => {


            // console.log(files.file[0].filepath);
            cloudinary.uploader.upload(files.file[0].filepath, { public_id: uuid() }, async function (error, result) {
                if (error) {
                    const error = new Error('No se pudo subir la imagen');
                    return res.status(500).json({ msg: error.message });
                }
                if (result) {
                    req.user.image = result.secure_url
                    await req.user.save();
                    res.json({ image: result.secure_url });
                }
            })
        })

    } catch (e) {
        const error = new Error('Hubo un error');
        return res.status(500).json({ msg: error.message });
    }
}


export const getUserByHandle = async (req: Request, res: Response) => {
    try {
        // extraemos de params
        const { handle } = req.params;
        // validar que existe el handle.
        const usuario = await User.findOne({ handle }).select('-_id -__v -email -password');
        if (!usuario) {
            const error = new Error('El usuario no existe');
            res.status(404).json({ msg: error.message });
        }
        res.json(usuario);
    } catch (e) {
        const error = new Error('Hubo un error');
        return res.status(500).json({ msg: error.message });
    }
}


export const searchByHandle = async (req: Request, res: Response) => {

    try {
        const { handle } = req.body;
        const usuario = await User.findOne({ handle });
        if (usuario) {
            const error = new Error(`el ${handle} ya está registrado`);
            res.status(409).json({ msg: error.message });
        }
        res.send(`${handle} si está disponible`);


    } catch (e) {
        const error = new Error('Hubo un error');
        return res.status(500).json({ msg: error.message });
    }
}