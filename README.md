# Vue.js PWA introduction project


NOTE: This repo is outdated in some terms but will be updated soon ;)

> A Vue.js project with very simple PWA capabilities and a looooooot of comments. It uses firebase endpoint for orders - don't break it so the others can use it ;)

P.S: I ommited some good practices for the sake of simplicity. Order data should be stored in indexeddb which can be accessed from your app and service worker. You should also catch errors in your code - always (so you should also have a notification for failed order etc.) ;> 
A good example of properly handled eCommerce PWA is [Vue Storefront](https://github.com/DivanteLtd/vue-storefront) 

## Useful links
 1. [Workbox](https://developers.google.com/web/tools/workbox/)
 2. [Offline cookbook - caching strategies](https://developers.google.com/web/fundamentals/instant-and-offline/offline-cookbook/)
 3. [Web app manifest](https://developers.google.com/web/fundamentals/web-app-manifest/)
## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build
```

For detailed explanation on how things work, consult the [docs for vue-loader](http://vuejs.github.io/vue-loader).
