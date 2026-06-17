import express from 'express';
import router from './routes/router';
import cors from 'cors';
import { corsConfig } from './config/cors';

// server es para contruir el servidor de la aplicacion


// VARIABLES
const app = express();

// leer datos de formulario.
app.use(express.json());

// habilitando cors
app.use(cors(corsConfig));

// agregando routing. aqui puedes definir varias rutas dentro del servidor
app.use('/', router)

export default app;