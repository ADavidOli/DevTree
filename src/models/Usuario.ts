import mongoose, { Schema } from "mongoose";

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

const User = mongoose.model('User', userScheema);
export default User;