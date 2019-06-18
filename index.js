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

var gun = Gun({
  web: server,
  localStorage: false,
  radisk: false
});

function logPeers() {
  console.log(`Peers: ${Object.keys(gun._.opt.peers).join(', ')}`);
}

setInterval(logPeers, 5000); //Log peer list every 5 secs


const view = path.join(__dirname, 'view/main.html');

app.use(express.static('view'));
app.get('*', function(_, res) {
  res.sendFile(view);
});


// Most of this code provided by @thinkingjoules
