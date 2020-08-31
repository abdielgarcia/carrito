/****************************************************************************************************
 * *********************************************PUERTO***********************************************
 * configurando el puerto para que cuandopase a produccion, se tome el puerto habilitado en el servidor
 * ***************************************************************************************************
 * / */

process.env.PORT = process.env.PORT || 3001;



/**
 * ENTRONO
 * 
 */

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';


/**
 * Vencimiento del token
 * 60 segundos
 * 60 minutos
 * 24 horas
 * 30 dias
 */
process.env.CADUCIDAD_TOKEN = 60 * 60 * 24 * 30;




/**
 * SEED de autenticación
 * 
 */
process.env.SEED = process.env.SEED || 'este-es-el-seed-desarrollo';



/**
 * Base de datos
 * 
 */

let urlDB;

if (process.env.NODE_ENV === 'dev') {

    urlDB = 'mongodb://localhost:27017/carrito';

} else {
    //Creamos una variable de entorno MONGO_URI donde guardamos esta url
    urlDB = process.env.MONGO_URI;
}

process.env.URLDB = urlDB;