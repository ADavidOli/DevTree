import type { Response, Request, NextFunction } from "express"
import jwt from 'jsonwebtoken';
import User, { IUser } from "../models/Usuario";


// definimos una global para que se pueda agregar el usuario en el request.
declare global {
    namespace Express{
        interface Request{
            user?: IUser
        }
    }
}


export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
    //leemo nuestro token desde los headers.
    // console.log(req.headers.authorization);

    const bearer = req.headers.authorization;
    // validamos que tenga un header de authorization
    if (!bearer) {
        const error = new Error('no autorizado');
        return res.status(404).json({ msg: error.message });
    }

    // validamos que tenga un token.
    // con este mantenemos el toke y compiamos lo que tenga del lado izquiero  con un espacio
    const [, token] = bearer.split(' ');
    // console.log(token);

    if (!token) {
        const error = new Error('no autorizado');
        return res.status(404).json({ msg: error.message });
    }

    try {
        const result = jwt.verify(token, process.env.JWT_SECRET);
        // hacemos comprobacion en base al id del usuario en  eljwt
        if (typeof result === 'object' && result.id) {
            const user = await User.findById(result.id).select('-password');
            if (!user) {
                const error = new Error('El usuario no existe');
                return res.status(404).json({ msg: error.message });
            }
            // colocamos en el request nuestro usuario verificado.
            req.user = user;

            // nos vamos al siguiente funcion
            next();
        }
    } catch (error) {
        res.status(500).json({ msg: 'token no valido' })
    }

}