import express from 'express';
import 'dotenv/config';
import router from './routes/router';
// VARIABLES
const app = express();

// leer datos de formulario.
app.use(express.json())


// agregando routing
app.use('/', router)

export default app;