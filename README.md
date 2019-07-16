# superPeer
A persistent, SEA-enabled, [gundb](https://github.com/amark/gun) node server for deployment anywhere. This Super Peer
runs a Gun node on both HTTP  and HTTPS. Technically, it is running two nodes that are syncing with each-other locally.
These behaviors can be enabled, disabled, and mix-matched.

### Options

**useSSL**_=true_ // Enable the HTTP server. If enabled, you must supply `cert.pem` and `privkey.pem`.

**useHTTP**_=true_ // Enable the HTTP server.

**peerify**_=true_ // Connect HTTP & HTTPS servers as peers of each-other, syncing data between them.

**persistence**_=true_ // Store data synced from peers to disk.

**port**_=8080_ // Port to serve HTTP requests over. The default is compatible with Cloudflare.

**sslPort**_=8443_ // Port to server HTTPS over. The default is compatible with Cloudflare.

**sslHost**_=example.com_ // This must be set to the domain matching your SSL certificate .pem files if `useSSL` ==
`true`.

### Misc

Source for Docker Hub Container included.

License: MIT
