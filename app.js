'use strict';

console.log('TP CIEL');

/*  *********************** Serveur Web ***************************   */
// 
var express = require('express');

var exp = express();

var port=80; /* Port du Site*/

exp.use(express.static('D:/monteirom.SNIRW/TP20_Javascript/JeuxJS/www'));

exp.get('/', function (req, res) {
    console.log('Reponse a un client'); 
    res.sendFile('D:/monteirom.SNIRW/TP20_Javascript/JeuxJS/www/index.html');
});

exp.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Erreur serveur express');
}); 

exp.listen(port, function () {
    console.log('Serveur en ecoute');
}); 