<template>
  <div class="view">
    <button class="view-button" @click="createOrder('normal')">Normal Order</button>
    <button class="view-button" @click="createOrder('vip')">VIP Order</button>
    <button @click="addBot">+ Bot</button>
    <button @click="reduceBot">- Bot</button>
    <div class="view-pending">
      <span class="view-title">Pending Orders</span>
      <div class="view-order" v-for="order in pendingOrders" :key="order.id">
          {{ order.number }}
          {{ order.userType }}
      </div>
    </div>
    <div class="view-complete">
      <span class="view-title">Completed Orders</span>
      <div class="view-order" v-for="order in completedOrders" :key="order.id">
        {{ order.number }}
        {{ order.userType }}
      </div>
    </div>
    
  </div>
</template>

<script>

import OrderService from "@/services/OrderService.js";
import BotService from "@/services/BotService.js";

export default {
  name: 'OrderView',
  data() {
    return {
      orderCounter: 0,
      id: 0,
      orders: [],
      bots: []
    }
  },
  methods: {
    createOrder(userType) {
      this.orderCounter++;
      const orderData = {
        number: this.orderCounter,
        userType: userType,
      };
      OrderService.createOrder(orderData, this.orders);
    },

    addBot() {
      BotService.addBot(this.bots);
    },

    reduceBot() {
      BotService.reduceBot(this.bots);
}

  },

  watch: {
    bots: {
      deep: true,
      handler() {
        BotService.processOrders(this.orders, this.bots)
      }
      },
    },

  computed: {
        pendingOrders() {
          return this.orders.filter(order => order.status === 'pending' || order.status === "processing");
        },
        completedOrders() {
          return this.orders.filter(order => order.status === 'completed');
        },
  },
  
  

}

</script>

<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
