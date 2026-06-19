import mongoose, { Schema, Document } from "mongoose";
/*
    utiliza genercis para poder utilizar la interface en base del modelo a mongoose
*/

export interface IUser extends Document {
    name: string
    email: string
    password: string
    handle: string
    description: string
    image: string
}


// definiendo scheemma
const userScheema = new Schema({
   handle:{
        type: String,
        require: true,
        trim: true,
        lowercase: true,
        unique: true
   },
    name: {
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
    },
    description: {
        type: String,
        default: ''
    },
    image: {
        type: String,
        default: ''
    }

});

const User = mongoose.model<IUser>('User', userScheema);
export default User;