<script>
export default {
  name: 'CartItem',
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  methods: {
    updateQuantity(item, event) {
      this.$emit('update-quantity', { item, quantity: parseInt(event.target.value, 10) });
    },
    removeItem(itemId) {
      this.$emit('remove-item', itemId);
    },
  },
};
</script>

<template>
  <div class="row cart-item mb-3">
    <div class="col-md-2">
      <img :src="item.image" alt="Cart item image" class="img-fluid">
    </div>
    <div class="col-md-6">
      <h5 class="cart-item-name">{{ item.name }}</h5>
      <p class="cart-item-price">Price: ${{ item.price.toFixed(2) }}</p>
      <p class="cart-item-quantity">
        Quantity:
        <input type="number" v-model="item.quantity" @input="updateQuantity(item, $event)" min="1" class="form-control d-inline w-auto">
      </p>
    </div>
    <div class="col-md-4 text-end">
      <button class="btn btn-danger" @click="removeItem(item.id)">Remove</button>
    </div>
  </div>
</template>

<style scoped>

</style>