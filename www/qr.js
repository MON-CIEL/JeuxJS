'use strict';

var ipServeur = '172.17.50.132';     // Adresse ip du serveur
var ws;                             // Variable pour l'instance de la WebSocket.
var message;

window.onload = function () {
    if (TesterLaCompatibilite()) {
        ConnexionAuServeurWebsocket();
    }
    ControleIHM();
};

function TesterLaCompatibilite() {
    let estCompatible = true;
    if (!('WebSocket' in window)) {
        window.alert('WebSocket non support� par le navigateur');
        estCompatible = false;
    }
    return estCompatible;
}
/*  ***************** Connexion au serveur WebSocket ********************   */
// 
function ConnexionAuServeurWebsocket() {
    ws = new WebSocket('ws://172.17.50.132/qr');

    ws.onclose = function (evt) {
        window.alert('WebSocket close');
    };

    ws.onopen = function () {
        console.log('WebSocket open');
    };

    ws.onmessage = function (evt) {
        document.getElementById('messageRecu').value = evt.data;
    };
}

function ControleIHM() {
    document.getElementById('Envoyer').onclick = BPEnvoyer;
}

function BPEnvoyer() {
    ws.send(document.getElementById('messageEnvoi').value);

}

/*  ****************** Broadcast clients WebSocket  **************   */
//
var aWss = expressWs.getWss('/echo');
var WebSocket = require('ws');
aWss.broadcast = function broadcast(data) {
    console.log("Broadcast aux clients navigateur : %s", data);
    aWss.clients.forEach(function each(client) {
        if (client.readyState == WebSocket.OPEN) {
            client.send(data, function ack(error) {
                console.log("    -  %s-%s", client._socket.remoteAddress,
                    client._socket.remotePort);
                if (error) {
                    console.log('ERREUR websocket broadcast : %s', error.toString());
                }
            });
        }
    });
}; 