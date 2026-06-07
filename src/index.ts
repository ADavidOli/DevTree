import server from './server'

const PORT = process.env.APP_ROUTER || 4000;

// SERVIDOR
server.listen(PORT, () => {
    console.log(`Servidor iniciado en el servidor ${PORT}`);
}); 