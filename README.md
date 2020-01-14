# superPeer

A non-persistence, SEA-enabled, gundb node server for deployment to heroku or docker.

Source for Docker Hub Container.

License: MIT

## Envvars

 - `FILE`:  
   JSON file to use as a backing store for file [storage engine](https://github.com/amark/gun/wiki/Storage); if set, enables the [file storage engine](https://github.com/amark/gun/wiki/Storage#file).

 - `PEERS`:  
   comma-separated list of peers to connect to.

 - `RADISK`:  
   if set to "`true`", enables the [file storage engine](https://github.com/amark/gun/wiki/Storage#radix).  
   *NOTICE: note the spelling difference. The envvar is called `RADISK` even though the storage engine is called "`Radix`"!*
