// arquitectura pequeña para aplicaciones pequeños. los handlers vienen siendo lo mismo que los controllers.
import User from "../models/Usuario";

export const CreateAccount = async (req, res) => {
    const user = new User(req.body);
    await user.save();

    res.json({
        msg: 'Usuario registrado correctamente'
    })
}