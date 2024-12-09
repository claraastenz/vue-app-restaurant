<script>
import CartItem from "@/models/CartItem.js";

export default {
  name: "MenuList",
  props: {
    list: { type: Array, required: true },
    addToCart: { type: Function, required: true },
  },
  methods: {
    showNutritionModal(item) {
      this.$emit('show-nutrition', item);
    },
  },
  addToCart(menuItem) {
    let cartItem = this.cart.find(item => item.id === menuItem.id);
    if (cartItem) {
      cartItem.increment();
    } else {
      this.cart.push(new CartItem(menuItem));
    }
    this.updateCartStorage();
    this.showModal(menuItem.name);
  },
};
</script>

<template>
  <div class="row">
    <div class="col-md-4" v-for="item in list" :key="item.id">
      <div class="card">
        <img :src="item.image" class="card-img-top" :alt="item.name" />
        <div class="card-body">
          <h5 class="card-title">{{ item.name }}</h5>
          <p class="card-text">{{ item.description }}</p>
          <p class="card-text"><strong>${{ item.price }}</strong></p>
          <button @click="$emit('add-to-cart', item)" class="btn btn-primary">Add to Cart</button>
          <button @click="$emit('show-details', item)" class="btn btn-info">Details</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style>

</style>