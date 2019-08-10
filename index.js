const path = require('path');
const express = require('express');
const fs = require('fs');
const https = require('https');
const http = require('http');
const Gun = require('gun');
const SEA = require("gun/sea");
const rtc = require("gun/lib/webrtc");


const useSSL = true; // Run SSL/HTTPS server? If set to true, you must supply cert.pem and privkey.pem (See below).
const useHTTP = true; // Run HTTP server?
const peerify = true; // Connect HTTP & HTTPS servers as peers of each-other?
const persistence = true; // Use storage to disk?
const port = (process.env.PORT || 8080); // 8080 can be used with Cloudflare.
const sslPort = (process.env.PORT || 8443); // 8443 can be used with Cloudflare.
const sslHost = "example.com"; // The domain of your SSL certificate.


let server, sslServer, gun, sslGun;

const app = express();
app.use(Gun.serve);

function logIn(msg){
    console.log(`in msg:${JSON.stringify(msg)}.........`);
}

function logOut(msg){
    console.log(`out msg:${JSON.stringify(msg)}.........`);
}
function ssLogIn(msg){
    console.log(`ssl in msg:${JSON.stringify(msg)}.........`);
}

function ssLogOut(msg){
    console.log(`ssl out msg:${JSON.stringify(msg)}.........`);
}

function logPeers() {
    !useSSL || console.log(`SSL Peers: ${Object.keys(sslGun._.opt.peers).join(', ')}`);
    !useHTTP || console.log(`Peers: ${Object.keys(gun._.opt.peers).join(', ')}`);
}

function logData() {
    !useSSL || console.log(`SSL In Memory: ${JSON.stringify(sslGun._.graph)}`);
    !useHTTP || console.log(`In Memory: ${JSON.stringify(gun._.graph)}`);
}

// Load your cert and priv key files. LetsEncrypt cert files can be copied
// from  /etc/letsencrypt/live/<yourdomain>/
if(useSSL){
    sslServer = https.createServer({
        key: fs.readFileSync('cert/privkey.pem'),
        cert: fs.readFileSync('cert/cert.pem')
    }, app)
        .listen(sslPort, function () {
            console.log(`ssl server listening on port: ${sslPort}`);
        })

    sslGun = Gun({
        peers: [(peerify ? `http://localhost:${port}/gun` : '')],
        web: sslServer,
        file: 'data',
        radisk: persistence,
        axe: false
    });

    sslGun._.on('in', ssLogIn);
    sslGun._.on('out', ssLogOut);
}
if(useHTTP){
    server = http.createServer({}, app)
        .listen(port, function () {
            console.log(`server listening on port: ${port}`);
        })

    gun = Gun({
        peers: [(peerify ? `https://${sslHost}:${sslPort}/gun` : '')],
        web: server,
        file: 'data',
        localStorage: false,
        radisk: (persistence && !useSSL),
        axe: false
    });

    gun._.on('in', logIn);
    gun._.on('out', logOut);
}

setInterval(logPeers, 5000); //Log peer list every 5 secs
setInterval(logData, 20000); //Log gun graph every 20 secs


const view = path.join(__dirname, 'view/main.html');

app.use(express.static('view'));
app.get('*', function(_, res) {
  res.sendFile(view);
});


// Base code by @thinkingjoules
// SSL/HTTPS by @TensorTom
