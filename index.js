const path = require('path');
const express = require('express');
const Gun = require('gun');
const SEA = require("gun/sea");

const port = (process.env.PORT || 8080);
const host = '0.0.0.0';

const app = express();
app.use(Gun.serve);

const server = app.listen(port, host);

console.log(`server listening on http://${host}:${port}`);

function logIn(a,b,c,d){
  console.log(`in a:${a}, b:${b}, c:${c}, d:${d}.........`);
}

function logOut(a,b,c,d){
  console.log(`in a:${a}, b:${b}, c:${c}, d:${d}.........`);
}

Gun.on('in', logIn);

Gun.on('out', logOut);


var gun = Gun({
  web: server,
  localStorage: false,
  radisk: false
});

function logPeers() {
  console.log(`Peers: ${Object.keys(gun._.opt.peers).join(', ')}`);
}

function logData() {
  console.log(`In Memory: ${gun._.graph}`);
}

setInterval(logPeers, 5000); //Log peer list every 5 secs
setInterval(logData, 20000); //Log gun graph every 20 secs


const view = path.join(__dirname, 'view/main.html');

app.use(express.static('view'));
app.get('*', function(_, res) {
  res.sendFile(view);
});


// Most of this code provided by @thinkingjoules
