<template>
  <div id="app">
    <header>
      <h1>VStickers</h1>
    </header>
    <img src="./assets/product-image.png" alt="Vue Storefront sticker">
    <h2> {{ product.name }}</h2>
    <p class="price">{{ product.price }} $ / each</p>
    <p> {{ product.description }}</p>
    <button @click="placeOrder">Buy now</button>
    <p class="offline-info" v-if="OfflineOnly">You are offline but you still can place orders!</p>
  </div>
</template>

<script>

export default {
  data () {
    return {
      product: {},
      order: null
    }
  },
  created () {
    fetch('https://vuepwapp.firebaseio.com/item.json')
      .then(res => res.json())
      .then(data => this.product = data)

    if ('Notification' in window && Notification.permission !== 'granted') {
      Notification.requestPermission()
    }
  },
  methods: {
    placeOrder () {
      const order = {
        date: Date.now(),
        user: 'John Doe'
      }
      // navigator.onLine will return true only fi we are online
      if (navigator.onLine) {
        // if so - just send the order
        fetch('https://vuepwapp.firebaseio.com/order.json', {
          method: 'POST',
          body: JSON.stringify(order)
        })
        .then(res => res.json())
        .then(data => alert(`Order for ${data.user} has been placed`))
      } else {
        // if not - register the sync event with orderSync tag which will be handled inside sw.js
        // Read more about background sync: https://developers.google.com/web/updates/2015/12/background-sync
        navigator.serviceWorker.ready.then(registration => {
          registration.sync.register('orderSync')
            .then(() => {
              console.log('Order sync registered')
            })
            .catch(error => {
              console.log('Unable to sync', error)
            })
        })
      }
    }
  }
}
</script>

<style src="./assets/style.css">