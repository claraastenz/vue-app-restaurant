import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '@/views/HomePage.vue';
import CartPage from '@/views/CartPage.vue';
import PastaCustomizer from "@/components/PastaCustomizer.vue";
import MenuPage from '@/views/MenuPage.vue';

const routes = [
    { path: '/', name: 'Home', component: HomePage },
    { path: '/cart', name: 'Cart', component: CartPage },
    { path: "/create-pasta", name: "CreatePasta", component: PastaCustomizer },
    { path: '/menu', name: 'Menu', component: MenuPage },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
