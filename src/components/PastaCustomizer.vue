<script>
import PastaBaseSelector from "@/components/PastaBaseSelector.vue";
import PastaSauceSelector from "@/components/PastaSauceSelector.vue";
import PastaToppingsSelector from "@/components/PastaToppingsSelector.vue";
import CustomPastaModal from "@/components/CustomPastaModal.vue";
import CartItem from "@/models/CartItem";
import AppNavbar from "@/components/AppNavbar.vue";
import AppFooter from "@/components/AppFooter.vue";

export default {
  name: "PastaCustomizer",
  components: {
    AppFooter,
    AppNavbar,
    PastaBaseSelector,
    PastaSauceSelector,
    PastaToppingsSelector,
    CustomPastaModal,
  },
  data() {
    return {
      selectedBase: "",
      selectedSauce: "",
      selectedToppings: [],
      cart: JSON.parse(localStorage.getItem("cart")) || [],
      pastaDetails: {},
      modalVisible: false,
    };
  },
  methods: {
    addToCart() {
      const customPasta = {
        id: Date.now(),
        name: `Custom Pasta: ${this.selectedBase} with ${this.selectedSauce}`,
        price: 15.99 + this.selectedToppings.length * 2,
        image: "photos/custom-pasta.jpg",
        base: this.selectedBase,
        sauce: this.selectedSauce,
        toppings: this.selectedToppings.join(", "),
      };

      const existingCartItem = this.cart.find(
          (item) =>
              item.name === customPasta.name &&
              item.toppings === customPasta.toppings
      );

      if (existingCartItem) {
        existingCartItem.quantity++;
      } else {
        this.cart.push(new CartItem(customPasta));
      }

      this.updateCartStorage();
      this.showModal(customPasta);
    },
    showModal(pastaDetails) {
      this.pastaDetails = pastaDetails;
      this.modalVisible = true;
    },
    updateCartStorage() {
      localStorage.setItem("cart", JSON.stringify(this.cart));
    },
  },
};
</script>

<template>
  <body>
  <app-navbar></app-navbar>
  <div class="create-pasta-section">
    <h1 class="section-title">Create Your Own Pasta</h1>
    <p class="section-description">Customize your pasta with a base, sauce, and toppings!</p>

    <div class="options-group">
      <div class="option">
        <h3>Choose Your Pasta Base:</h3>
        <pasta-base-selector v-model="selectedBase"></pasta-base-selector>
      </div>

      <div class="option">
        <h3>Select Your Pasta Sauce:</h3>
        <pasta-sauce-selector v-model="selectedSauce"></pasta-sauce-selector>
      </div>

      <div class="option">
        <h3>Choose Your Toppings:</h3>
        <pasta-toppings-selector v-model="selectedToppings"></pasta-toppings-selector>
      </div>
    </div>

    <button
        class="btn btn-primary add-to-cart-btn"
        :disabled="!selectedBase || !selectedSauce"
        @click="addToCart"
    >
      Add to Cart
    </button>
  </div>

  <custom-pasta-modal
      :title="'Item Added to Cart'"
      :pasta-details="pastaDetails"
      :visible="modalVisible"
      @close="modalVisible = false"
  ></custom-pasta-modal>
  </body>
</template>

<style scoped>
body {
  background: url('/photos/restaurant.jpg.png') no-repeat center center fixed;
  background-size: cover;
  color: white;
  font-family: 'Arial', sans-serif;
  margin: 0;
  padding: 0;
}

.create-pasta-section {
  padding: 20px;
  background-color: rgba(0, 0, 0, 0.7);
  border-radius: 8px;
  margin: 50px auto;
  max-width: 700px;
  text-align: left;
  color: white;
}

.section-title {
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 20px;
  text-align: center;
}

.section-description {
  font-size: 1.2rem;
  margin-bottom: 30px;
  text-align: center;
}

.options-group {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.option h3 {
  font-size: 1.5rem;
  color: #fff;
  margin-bottom: 10px;
}

.add-to-cart-btn {
  display: block;
  width: 100%;
  max-width: 300px;
  margin: 20px auto;
  padding: 10px 20px;
  background-color: #ff7043;
  color: white;
  font-size: 1.1rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  text-transform: uppercase;
}

.add-to-cart-btn:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.add-to-cart-btn:hover:not(:disabled) {
  background-color: #ff5722;
}
</style>
