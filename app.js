'use strict';

/*  *********************** Serveur Web ***************************   */
// 
var express = require('express');

var exp = express();

exp.use(express.static('D:/monteirom.SNIRW/TP20_Javascript/JeuxJS/www'));

exp.get('/', function (req, res) {
    console.log('Reponse a un client'); 
    res.sendFile('D:/monteirom.SNIRW/TP20_Javascript/JeuxJS/www/textchat.html');
});

exp.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Erreur serveur express');
}); 

/*  *************** serveur WebSocket express *********************   */
// 
var expressWs = require('express-ws')(exp);

// Connexion des clients � la WebSocket /echo et evenements associ�s 
exp.ws('/echo', function (ws, req) {

    console.log('Connection WebSocket %s sur le port %s',
        req.connection.remoteAddress, req.connection.remotePort);

    ws.on('message', function (message) {
        message = ws._socket._peername.address + ws._socket._peername.port + ' : ' + message; 
        console.log('De %s %s, message :%s', req.connection.remoteAddress,
            req.connection.remotePort, message);
        ws.send(message);
    });

    ws.on('close', function (reasonCode, description) {
        console.log('Deconnexion WebSocket %s sur le port %s',
            req.connection.remoteAddress, req.connection.remotePort);
    });

}); 

/*  ****** Serveur web et WebSocket en ecoute sur le port 80  ********   */
//  
var portServ = 80;
exp.listen(portServ, function () {
    console.log('Serveur en ecoute');
}); 
