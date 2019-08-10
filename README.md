# superPeer
A persistent, SEA-enabled, [gundb](https://github.com/amark/gun) node server for deployment anywhere. This Super Peer
runs a Gun node on both HTTP  and HTTPS. Technically, it is running two nodes that are syncing with each-other locally.
These behaviors can be enabled, disabled, and mix-matched.

### Quickstart
First:
```
git clone https://github.com/TensorTom/superPeer.git
cd superpeer
```
If you're using SSL:
```
sed -i 's/example.com/yourdomain.com/g' index.js
```
If you're using LetsEncrypt:
```
cp /etc/letsencrypt/live/yourdomain.com/cert.pem cert/
cp /etc/letsencrypt/live/yourdomain.com/privkey.pem cert/
```
Then:
```
npm install
npm start
```
To run in background between terminal sessions (On Linux):
```
npm install supervisor -g
nohup npm run start-continuous > superPeer.out 2>&1 &
```
### Options

**useSSL**_=true_ // Enable the HTTPS server. If enabled, you must supply `cert.pem` and `privkey.pem`.

**useHTTP**_=true_ // Enable the HTTP server.

**peerify**_=true_ // Connect HTTP & HTTPS servers as peers of each-other, syncing data between them.

**persistence**_=true_ // Store data synced from peers to disk.

**port**_=8080_ // Port to serve HTTP requests over. The default is compatible with Cloudflare.

**sslPort**_=8443_ // Port to server HTTPS over. The default is compatible with Cloudflare.

**sslHost**_=example.com_ // This must be set to the domain matching your SSL certificate .pem files if `useSSL` ==
`true`.

### Status

This superNode works well.

Gun [issue 769](https://github.com/amark/gun/issues/769) is now fixed and so I have upgraded this repo's gun to the latest version.

### Misc

Source for Docker Hub Container included.

Original repo (Started as non-persistent, non-ssl): https://github.com/Dletta/superPeer.git

superPeer is also developing from TensorTom's fork: https://github.com/TensorTom/superPeer

**License:** MIT
