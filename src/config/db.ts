import mongoose  from "mongoose";

export const connectDB = async()=>{
    
    try {
        const uri = process.env.MONGO_URI;
        const conexion = await mongoose.connect(uri);
        console.log(`MongoDB conectado en ${conexion.connection.host} en el puerto ${conexion.connection.port}`);

    } catch (error) {
        console.log(error.message);
        process.exit(1);
    }
}