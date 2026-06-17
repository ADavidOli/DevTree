// archivo de configuracion de cors.
import { CorsOptions } from "cors";

export const corsConfig:CorsOptions = {

    // origin es de donde se está enviando la peticion
    origin: function(origin, callback){

        console.log(`origin recibido: ${origin}`,)


        // creando lista de dominios permitidos para que funcione desde herramientas de api y desde el frontend
        const whitelist = [process.env.URL_FRONTEND];
        // comparando con nuestra api, corriendo el programa desde nuestro script "npm run dev:api"
        // una bandera --api para poder correr el servidor desde otro script y así permitir la conexion
        // if(process.argv[2]=== '--api'){
        //     whitelist.push(undefined);
        // }

        // sin bandera --api, corre más general.
        if(!origin){
            return callback(null, true)
        }
        // permitiendo el acceso desde el frontend
        if(whitelist.includes(origin)){
            callback(null, true); //si no hay errores, permitimos la conexion
        }else{
            callback(new Error('Error de cors')) //si hay errore, no permitimos la conexiones
        }
    }
}