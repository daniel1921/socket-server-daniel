import Server from "./classes/server";
import  router  from "./routes/router";
import bodyParser from 'body-parser';
import cors from 'cors';

const server = Server.instance;

// BODY PARSER
server.app.use(bodyParser.urlencoded({extended:true}));
server.app.use(bodyParser.json());

//configuración del cors
server.app.use(cors({origin: true, credentials: true}));

//CONFIGURACIÓN DE RUTAS
server.app.use('/', router);

server.start( () => {
    console.log('Servidor corriendo en el puerto: ' + server.port);
})