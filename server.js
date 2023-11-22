/*=============================== CREACION DE SERVER  ================================== */


const { log } = require('console');
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const logger = require('morgan');
const cors = require('cors');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.disable('x-powered-by');

const port = process.env.PORT || 3000;
app.set('port', port);

server.listen(port, function(){
    console.log('aplicacion de Node corriendo...' );
})

app.get( '/', ( req, res )=>{
    res.send('ruta raiz del back');
} )

app.get( '/test', ( req, res )=>{
    res.send('ruta usada para TEST');
} )

app.use( ( error, req, res, next )=>{
    console.log(error)
    res.status(error.status || 500).send(error.stack)
} )