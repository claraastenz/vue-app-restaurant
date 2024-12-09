import '@/scss/app.scss'; // Your custom SCSS
// import 'bootstrap/dist/css/bootstrap.css'; // Bootstrap CSS
// import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // Bootstrap JS

import { createApp } from 'vue';
import App from './App.vue';
import router from './router/router.js'; // Adjust the path as needed


const app = createApp(App);

// Use the router before mounting the app
app.use(router);

app.mount('#app');
