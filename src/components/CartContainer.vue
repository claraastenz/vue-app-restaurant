<script>
export default {
  name: "CartContainer",
  data() {
    return {
      cart: JSON.parse(localStorage.getItem("cart")) || [],
    };
  },
  computed: {
    totalPrice() {
      return this.cart.reduce((total, item) => total + item.price * item.quantity, 0);
    },
  },
  methods: {
    updateQuantity(item, event) {
      const quantity = parseInt(event.target.value);
      if (quantity < 1) {
        this.removeItem(item.id);
      } else {
        item.quantity = quantity;
      }
      this.updateCartStorage();
    },
    removeItem(itemId) {
      this.cart = this.cart.filter(item => item.id !== itemId);
      this.updateCartStorage();
    },
    clearCart() {
      this.cart = [];
      this.updateCartStorage();
    },
    updateCartStorage() {
      localStorage.setItem("cart", JSON.stringify(this.cart));
    },
    navigateToHome() {
      this.$router.push('/');
    },
  },
  watch: {
    cart: {
      handler(newCart) {
        localStorage.setItem("cart", JSON.stringify(newCart));
      },
      deep: true,
    },
  },
};
</script>

<template>
  <div>
    <table class="table">
      <thead>
      <tr>
        <th>Item</th>
        <th>Price</th>
        <th>Quantity</th>
        <th>Total</th>
        <th>Actions</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="item in cart" :key="item.id">
        <td>{{ item.name }}</td>
        <td>${{ item.price.toFixed(2) }}</td>
        <td>
          <input type="number" class="form-control" v-model="item.quantity" @input="updateQuantity(item, $event)">
        </td>
        <td>${{ (item.price * item.quantity).toFixed(2) }}</td>
        <td>
          <button class="btn btn-danger btn-sm" @click="removeItem(item.id)">Remove</button>
        </td>
      </tr>
      </tbody>
    </table>
    <h3>Total: ${{ totalPrice.toFixed(2) }}</h3>
    <button class="btn btn-secondary" @click="clearCart">Clear Cart</button>
    <button class="btn btn-primary" @click="navigateToHome">Back to Home Page</button>
  </div>
</template>

<style scoped>

</style>