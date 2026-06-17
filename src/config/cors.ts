// archivo de configuracion de cors.
import { CorsOptions } from "cors";

export const corsConfig:CorsOptions = {
    // origin es de donde se está enviando la peticion
    origin: function(origin, callback){
        if(origin === process.env.URL_FRONTEND){
            callback(null, true); //si no hay errores, permitimos la conexion
        }else{
            callback(new Error('Error de cors')) //si hay errore, no permitimos la conexiones
        }
    }
}