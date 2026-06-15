import mongoose, { Schema } from "mongoose";

/*
    utiliza genercis para poder utilizar la interface en base del modelo a mongoose
*/

interface IUser {
    name: string
    email: string
    password: string
}


// definiendo scheemma
const userScheema = new Schema({
    nombre: {
        required: true,
        type: String,
        trim: true,
    },
    email: {
        required: true,
        type: String,
        trim: true,
        unique: true
    },
    password: {
        required: true,
        type: String,
        trim: true
    }

});

const User = mongoose.model<IUser>('User', userScheema);
export default User;