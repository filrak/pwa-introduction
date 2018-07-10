// Read about Service Workers: https://developers.google.com/web/fundamentals/primers/service-workers/
// Inside Service Workers you can import external scripts by using 'importScripts' instead of using ES modules.
// Learn more about Workbox: https://developers.google.com/web/tools/workbox/
importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.2.0/workbox-sw.js');

// Workbox routes are just matching the provided pattern with the request object in a fetch event.
// If the filename matches the pattern then the provided caching strategy is used to save it on users device
// We are using networkFirst strategy for js files as it's very likely that they'll change over time. 
// Network first strategy ensures that the users will receive the most recent version of the file from the server
// This strategy uses cache only as a fallback when network is not accessible
// Read more about caching strategies: https://developers.google.com/web/fundamentals/instant-and-offline/offline-cookbook/
workbox.routing.registerRoute(
  /^.*\.js$/,
  workbox.strategies.networkFirst()
);

// It's a good practice to keep different data types in different caches.
// In this example we are creating new cache called 'html-cache' which will contain our main html file
workbox.routing.registerRoute(
  '/',
  workbox.strategies.networkFirst({
    cacheName: 'html-cache'
  })
);

// Images will most likely stay the same so we can ommit the server and serve them directly from cache.
// We can update this cache once a week with workbox expiration plugin. 
// The timestamps for this plugin are stored in indexedDB
workbox.routing.registerRoute(
  /.*\.(?:png|jpg|jpeg|svg|gif)/,
  workbox.strategies.cacheFirst({
    cacheName: 'image-cache',
    plugins: [
      new workbox.expiration.Plugin({
        maxAgeSeconds: 7 * 24 * 60 * 60,
      })
    ],
  })
);

// You can also store the JSON-like objects in indexedDB which is very suitable for this format of data.
// The indexedDB is accessible through Service Worker in opposite to local storage and session storage
// In this example we are still using standard cache to keep our product data
workbox.routing.registerRoute(
  /.*\.json$/,
  workbox.strategies.networkFirst({
    cacheName: 'data-cache'
  }),
  'GET'
);

// This example is very simple. In the real world apps we would need to store the order data somewhere instead of hardcoding it.
// IndexedDB is a best place for this since you can write to it inside your web app and later read saved data from Service Worker
function placeOrder () {
  const order = {
    date: Date.now(),
    user: 'John Doe'
  }
  fetch('https://vuepwapp.firebaseio.com/order.json', {
    method: 'POST',
    body: JSON.stringify(order)
  })
  .then(res => res.json())
  .then(data => console.log('Order placed'))
}

// Here we are just listening for the sync event and later reacting if the events tag is 'orderSync'
// The sync event is fired once the connectivity is stable
self.addEventListener('sync', event => {
  // Please note that the 'Notification' object is not accesible directly in a Service Worker since it;s bound to 'window' object. 
  // You can also use this notification inside placeOrder to tell user about succesful/failed order.
  // For the sake of simplicity I omitted error handling in this app

  // We registered sync event with 'orderSync' tag inside App.vue
  if (event.tag === 'orderSync') {
    self.registration.showNotification('Order placed!', {
      body: 'The order you have placed being order has been sent to a server!'
    })
    // The SW will wait in the background to proceed the order even if the website is closed.
    event.waitUntil(placeOrder())
  }
})
