import express from 'express';
import 'dotenv/config';
import router from './routes/router';



// VARIABLES
const app = express();

// agregando routing
app.use('/', router)

export default app;