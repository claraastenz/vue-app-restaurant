<script>
export default {
  name: 'CartSummary',
  props: {
    totalPrice: {
      type: Number,
      required: true,
    },
  },
  methods: {
    clearCart() {
      this.$emit('clear-cart');
    },
  },
};
</script>

<template>
  <div class="text-end mb-4">
    <h4>Total: ${{ totalPrice.toFixed(2) }}</h4>
    <div class="d-flex justify-content-between">
      <button class="btn btn-danger" @click="clearCart">CLEAR CART</button>
      <router-link to="/checkout" class="btn btn-success">Proceed to Checkout</router-link>
    </div>
  </div>
</template>

<style scoped>

</style>