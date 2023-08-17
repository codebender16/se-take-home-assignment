export default {
  processOrders(orders, bots) {
    const pendingOrders = orders.filter((order) => order.status === "pending");
    const botsWithCapacity = bots.filter((bot) => bot.hasCapacity === true);
    if (pendingOrders.length > 0 && botsWithCapacity.length > 0) {
      const availableBot = botsWithCapacity[0];
      availableBot.currentOrder = pendingOrders[0];
      availableBot.currentOrder.status = "processing";
      availableBot.hasCapacity = false;

      availableBot.currentOrder.timeOutId = setTimeout(() => {
        availableBot.currentOrder.status = "completed";
        availableBot.hasCapacity = true;
      }, 5000);
    }
  },
  addBot(bots) {
    const newBot = {
      hasCapacity: true,
      currentOrder: {},
    };
    bots.push(newBot);
  },
  reduceBot(bots) {
    if (bots.length === 0) {
      return;
    }
    const newestBot = bots[bots.length - 1];
    if (!newestBot) {
      return;
    }

    if (newestBot.currentOrder.status === "processing") {
      console.log("timeout", newestBot.currentOrder);
      clearTimeout(newestBot.currentOrder.timeoutId);
      newestBot.currentOrder.status = "pending";
    }

    bots.pop();
  },
};
