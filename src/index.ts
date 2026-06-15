import server from './server'
import { connectDB } from './config/db';



const PORT = process.env.APP_ROUTER || 4000;
// conectar nuestra base de datos
connectDB();

// SERVIDOR
server.listen(PORT, () => {
    console.log(`Servidor iniciado en el servidor ${PORT}`);
}); 



