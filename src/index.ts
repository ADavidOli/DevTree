import server from './server'
import 'dotenv/config';
import { connectDB } from './config/db';
// aqui se da la entrada a la aplicacion
const PORT = process.env.APP_ROUTER || 4000;
// conectar nuestra base de datos
connectDB();

// SERVIDOR
server.listen(PORT, () => {
    console.log(`Servidor iniciado en el servidor ${PORT}`);
}); 



