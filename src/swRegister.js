// If service worker is supported - register it
if ( 'serviceWorker' in navigator ) {
  navigator.serviceWorker.register('sw.js')
}