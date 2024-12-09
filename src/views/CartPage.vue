<script>
import CartContainer from '@/components/CartContainer.vue';
import AppNavbar from "@/components/AppNavbar.vue";
import AppFooter from "@/components/AppFooter.vue";

export default {
  name: 'CartPage',
  components: {
    AppFooter,
    AppNavbar,
    CartContainer,
  },
};
</script>

<template>
  <div>

    <app-navbar></app-navbar>

  <div class="container my-4">
    <h1>Your Cart</h1>
    <CartContainer />
  </div>

    <app-footer
        brand="Cedar Bar & Grill"
        :links="links"
        :socials="socials"
    ></app-footer>

  </div>
</template>

<style scoped>

</style>