const path = require('path');
const express = require('express');
var fs = require('fs')
var https = require('https')
var http = require('http')
const Gun = require('gun');
const SEA = require("gun/sea");
require("gun/lib/webrtc");

const port = (process.env.PORT || 8080);
const sslPort = (process.env.PORT || 8443); // 8443 important if using Cloudflare.
//const host = '0.0.0.0';

const app = express();
app.use(Gun.serve);

// Load your cert and priv key files. LetsEncrypt cert files can be copied
// from  /etc/letsencrypt/live/<yourdomain>/
const sslServer = https.createServer({
  key: fs.readFileSync('cert/privkey.pem'),
  cert: fs.readFileSync('cert/cert.pem')
}, app)
.listen(sslPort, function () {
    console.log(`ssl server listening on port: ${sslPort}`);
})

const server = http.createServer({}, app)
.listen(port, function () {
    console.log(`server listening on port: ${port}`);
})


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

var sslGun = Gun({
    peers: [`http://localhost:${port}/gun`],
    web: sslServer,
    localStorage: true,
    file: 'data',
    radisk: true,
    AXE: false
});

var gun = Gun({
    peers: [`https://tensortom.com:${sslPort}/gun`],
    web: server,
    localStorage: false,
    radisk: false,
    AXE: false
});

sslGun._.on('in', ssLogIn);
sslGun._.on('out', ssLogOut);
gun._.on('in', logIn);
gun._.on('out', logOut);

function logPeers() {
  console.log(`SSL Peers: ${Object.keys(sslGun._.opt.peers).join(', ')}`);
  console.log(`Peers: ${Object.keys(gun._.opt.peers).join(', ')}`);
}

function logData() {
  console.log(`SSL In Memory: ${JSON.stringify(sslGun._.graph)}`);
  console.log(`In Memory: ${JSON.stringify(gun._.graph)}`);
}

setInterval(logPeers, 5000); //Log peer list every 5 secs
setInterval(logData, 20000); //Log gun graph every 20 secs


const view = path.join(__dirname, 'view/main.html');

app.use(express.static('view'));
app.get('*', function(_, res) {
  res.sendFile(view);
});


// Most of this code provided by @thinkingjoules
// SSL/HTTPS by @TensorTom
