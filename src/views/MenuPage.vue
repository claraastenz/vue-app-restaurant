<script>
import AppNavbar from "@/components/AppNavbar.vue";
import AppFooter from "@/components/AppFooter.vue";
import CartModal from "@/components/CartModal.vue";
import MenuItemList from "@/components/MenuItemList.vue";
import SkeletonLoader from "@/components/SkeletonLoader.vue";
import MenuItem from "@/models/MenuItem";
import CartItem from "@/models/CartItem";
import { Modal } from 'bootstrap';
import axios from 'axios';

export default {
  name: "MenuPage",
  components: {
    AppNavbar,
    AppFooter,
    CartModal,
    MenuItemList,
    SkeletonLoader
  },
  data() {
    return {
      loading: true,
      menuItems: [],
      cart: JSON.parse(localStorage.getItem('cart'))?.map(item => new CartItem(item)) || [],
      modalTitle: '',
      modalMessage: '',
      links: [
        { label: 'Home', url: '/' },
        { label: 'Menu', url: '/menu' },
      ],
      socials: [
        { icon: 'fab fa-facebook', url: 'https://facebook.com/' },
        { icon: 'fab fa-instagram', url: 'https://instagram.com/' },
      ]
    };
  },
  computed: {
    totalPrice() {
      return this.cart.reduce((total, item) => total + item.price * item.quantity, 0);
    }
  },
  methods: {
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
    updateCartStorage() {
      localStorage.setItem('cart', JSON.stringify(this.cart));
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
  },
  async mounted() {
    this.cart = JSON.parse(localStorage.getItem('cart')) || [];

    setTimeout(() => {
      this.menuItems = [
        new MenuItem(1, "Spaghetti", "Handcrafted pasta in a rich tomato sauce, topped with fresh basil and Parmesan.", 22.99, "/photos/pasta.jpg.jpg"),
        new MenuItem(2, "Chicken Florentine", "Tender chicken breast sautéed with garlic and spinach, served in a creamy white wine sauce.", 24.99, "/photos/chicken.jpg"),
        new MenuItem(3, "Lasagna", "Layers of tender pasta, rich meat sauce, and melted mozzarella, baked to perfection.", 19.99, "/photos/lasagna.jpg"),
        new MenuItem(4, "Tomato Soup", "Roasted garlic, chicken broth, heavy cream, diced tomatoes. A symphony of flavors", 14.99, "/photos/tomatosoup.png"),
        new MenuItem(5, "Caprese Salad", "Fresh mozzarella, ripe tomatoes, and fragrant basil, drizzled with balsamic glaze.", 14.99, "/photos/salad.jpg"),
        new MenuItem(6, "Flatbread", "Crisp flatbread topped with roasted vegetables, fresh herbs, and a blend of melted cheeses.", 17.99, "/photos/flatbread.jpg")
      ];
      this.loading = false;
    }, 2000);
  }
};
</script>

<template>
  <div>
    <app-navbar></app-navbar>
    <div class="container my-5">
      <h1>Our Menu</h1>
      <p>Explore our selection of Mediterranean-inspired dishes, crafted with fresh, locally-sourced ingredients.</p>

      <SkeletonLoader
          v-if="loading"
          :count="6" >
      </SkeletonLoader>

      <MenuItemList
          v-else
          :list="menuItems"
          @add-to-cart="addToCart"
          @show-details="showDetails">
      </MenuItemList>
    </div>

    <cart-modal
        title="Cedar Bar & Grill"
        :message="modalMessage">
    </cart-modal>

    <app-footer
        brand="Cedar Bar & Grill"
        :links="links"
        :socials="socials"
    ></app-footer>
  </div>
</template>

<style scoped>
.container {
  max-width: 960px;
}
</style>