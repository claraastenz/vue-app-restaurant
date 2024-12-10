<script>
import AppNavbar from "@/components/AppNavbar.vue";
import AppFooter from "@/components/AppFooter.vue";
import CartModal from "@/components/CartModal.vue";
import MenuItemList from "@/components/MenuItemList.vue";
import OrderNowSection from '@/components/OrderNowSection.vue';
import RestaurantCard from "@/components/RestaurantCard.vue";
import GoogleMap from "@/components/GoogleMap.vue";
import { Modal } from 'bootstrap';
import MenuItem from '@/models/MenuItem';
import CartItem from '@/models/CartItem';
import axios from 'axios';

export default {
  components: {
    AppNavbar,
    AppFooter,
    CartModal,
    MenuItemList,
    OrderNowSection,
    RestaurantCard,
    GoogleMap,
  },

  data() {
    return {
      menuItems: [
        new MenuItem(1, "Spaghetti", "Handcrafted pasta in a rich tomato sauce, topped with fresh basil and Parmesan.", 22.99, "/photos/pasta.jpg.jpg"),
        new MenuItem(2, "Chicken Florentine", "Tender chicken breast sautéed with garlic and spinach, served in a creamy white wine sauce.", 24.99, "/photos/chicken.jpg"),
        new MenuItem(3, "Lasagna", "Layers of tender pasta, rich meat sauce, and melted mozzarella, baked to perfection.", 19.99, "/photos/lasagna.jpg"),
        new MenuItem(4, " Tomato Soup", "Roasted garlic, chicken broth, heavy cream, diced tomatoes. A symphony of flavors", 14.99, "/photos/tomatosoup.png"),
        new MenuItem(5, "Caprese Salad", "Fresh mozzarella, ripe tomatoes, and fragrant basil, drizzled with balsamic glaze.", 14.99, "/photos/salad.jpg"),
        new MenuItem(6, "Flatbread", "Crisp flatbread topped with roasted vegetables, fresh herbs, and a blend of melted cheeses.", 17.99, "/photos/flatbread.jpg")
      ],
      cart: JSON.parse(localStorage.getItem('cart'))?.map(item => new CartItem(item)) || [],
      modalTitle: '',
      modalMessage: '',
      weatherData: null,
      weatherSuggestion: '',
    };
  },

  computed: {
    totalPrice() {
      return this.cart.reduce((total, item) => total + item.price * item.quantity, 0);
    }
  },

  methods: {
    async fetchWeather() {
      try {
        const apiKeyTwo = import.meta.env.VITE_API_KEY_TWO;
        const city = 'Milwaukee';
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKeyTwo}&units=imperial`);
        this.weatherData = response.data;

        this.setWeatherSuggestion();
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    },
    setWeatherSuggestion() {
      if (!this.weatherData) return;

      const temp = this.weatherData.main.temp;

      if (temp < 50) {
        this.weatherSuggestion = "It's chilly! Warm up with our hot soup or lasagna.";
      } else if (temp >= 50 && temp <= 75) {
        this.weatherSuggestion = "Mild weather today! Try our flatbread or Caprese salad.";
      } else {
        this.weatherSuggestion = "It's warm outside! Enjoy a light meal like our salad or calamari.";
      }
    },
    getRecommendedDishes() {
      if (!this.weatherData) return [];
      const temp = this.weatherData.main.temp;

      if (temp < 50) {
        return this.menuItems.filter(item => item.name.includes("Lasagna") || item.name.includes("Soup"));
      } else if (temp >= 50 && temp <= 75) {
        return this.menuItems.filter(item => item.name.includes("Flatbread") || item.name.includes("Salad"));
      } else {
        return this.menuItems.filter(item => item.name.includes("Calamari") || item.name.includes("Salad"));
      }
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

    showModal(itemName) {
      this.modalTitle = 'Item Added to Cart';
      this.modalMessage = `${itemName} has been successfully added to your cart.`;
      this.$nextTick(() => {
        const modalElement = document.getElementById('cartModal');
        if (modalElement) {
          const modal = new Modal(modalElement);
          modal.show();
        } else {
          console.error("Modal element not found.");
        }
      });
    },
    updateQuantity(item, event) {
      const quantity = parseInt(event.target.value);
      if (quantity < 1) {
        this.removeItem(item.id);
      } else {
        item.quantity = quantity;
      }
      this.updateCartStorage();
    },
    async fetchNutrition(menuItem) {
      const apiKey = import.meta.env.VITE_API_KEY;
      try {
        const response = await axios.get(`https://api.spoonacular.com/recipes/guessNutrition?title=${menuItem.name}&apiKey=${apiKey}`);
        if (response.data.status === 'error') {
          menuItem.nutrition = { status: 'error', message: response.data.message };
        } else {
          menuItem.nutrition = response.data;
        }
      } catch (error) {
        console.error('Error fetching nutritional information:', error);
        menuItem.nutrition = { status: 'error', message: 'Failed to fetch nutrition data' };
      }
    },
    async showDetails(menuItem) {
      if (!menuItem.nutrition) {
        await this.fetchNutrition(menuItem);
      }

      if (menuItem.nutrition?.status === 'error') {
        alert(`Unable to fetch nutrition details for ${menuItem.name}: ${menuItem.nutrition.message}`);
        return;
      }

      alert(`
    ${menuItem.name}
    Calories: ${menuItem.nutrition.calories.value} ${menuItem.nutrition.calories.unit}
    Fat: ${menuItem.nutrition.fat.value} ${menuItem.nutrition.fat.unit}
    Carbohydrates: ${menuItem.nutrition.carbs.value} ${menuItem.nutrition.carbs.unit}
    Protein: ${menuItem.nutrition.protein.value} ${menuItem.nutrition.protein.unit}
  `);
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
      localStorage.setItem('cart', JSON.stringify(this.cart));
    },

  },


  mounted() {
    this.cart = JSON.parse(localStorage.getItem('cart')) || [];
    this.fetchWeather();
    const widgetCss = document.createElement('link');
    widgetCss.rel = 'stylesheet';
    widgetCss.href = 'https://widget.meteomatics.com/v2/meteomatics-weather-widget.css';
    document.head.appendChild(widgetCss);

    const widgetJs = document.createElement('script');
    widgetJs.src = 'https://widget.meteomatics.com/v2/meteomatics-weather-widget.js';
    widgetJs.async = true;
    document.body.appendChild(widgetJs);

  }
};

</script>

<template>
  <div>
    <app-navbar></app-navbar>

    <OrderNowSection
        heading-text="Order Today"
        button-text="Explore Menu"
        link="/menu"
        image-src="/photos/restaurant.jpg.png"
        :weather-suggestion="weatherSuggestion"
        :recommended-dishes="getRecommendedDishes()"
        :add-to-cart="addToCart"
        @show-details="showDetails"
    ></OrderNowSection>

    <Restaurant-card
        image-src="/photos/mediterraneancuisine.jpg"
        :title="'Welcome to Cedar Grill'"
        :description="`Experience the finest Mediterranean cuisine in a warm and inviting atmosphere. At Cedar Grill, we blend fresh, locally sourced ingredients with traditional flavors to create a unique and unforgettable dining experience. Whether you're here for a romantic dinner or a family gathering, our team is dedicated to making your visit truly special.`"
        menuLink="/menu"
    ></Restaurant-card>

    <div class="create-pasta-section text-center my-5">
      <h2>Customize Your Own Pasta</h2>
      <p>Create a pasta dish tailored to your tastes with our variety of options!</p>
      <router-link to="/create-pasta" class="btn btn-primary">
        Start Customizing
      </router-link>
    </div>

    <div class="album py-5 bg-body-tertiary">
      <div class="container">
        <h2>Featured Specials</h2>
        <MenuItemList
            :list="menuItems"
            @add-to-cart="addToCart"
            @show-details="showDetails"
        ></MenuItemList>
      </div>
    </div>

    <cart-modal
        title="Cedar Bar & Grill"
        :message="modalMessage"
    ></cart-modal>

    <app-footer
        brand="Cedar Bar & Grill"
        :links="links"
        :socials="socials"
    ></app-footer>
  </div>
</template>

<style scoped>

</style>
