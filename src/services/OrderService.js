export default {
  createOrder(orderData, orders) {
    const newOrder = {
      id: orders.length + 1,
      priority: orderData.userType === "vip" ? "a" : "b", // what is there is more priority class being added in the future, perhaps switchcase
      status: "pending",
      ...orderData,
    };
    orders.push(newOrder);
    this.sortOrderPriority(orders);
  },
  sortOrderPriority(orders) {
    orders.sort((a, b) =>
      a.priority < b.priority ? -1 : a.priority > b.priority ? 1 : 0
    );
  },
  getPendingAndProcessingOrders(orders) {
    return orders.filter(
      (order) => order.status === "pending" || order.status === "processing"
    );
  },
  getCompletedOrders(orders) {
    return orders.filter((order) => order.status === "completed");
  },
};
