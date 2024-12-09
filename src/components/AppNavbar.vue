<script>
export default {
  name: "AppNavbar",
  data() {
    return {
      brand: 'Cedar Grill & Lounge',
      links: [
        { name: 'Home', to: '/' },
        { name: 'Menu', to: '/menu' },
        { name: 'Cart', to: '/cart' },
      ],
    };
  },
};
</script>

<template>
  <nav class="navbar navbar-expand-md custom-navbar sticky-top border-bottom">
    <div class="container">
      <router-link class="navbar-brand" to="/">
        <h3>{{ brand }}</h3>
      </router-link>

      <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvas"
          aria-controls="offcanvas"
          aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvas" aria-labelledby="offcanvasLabel">
        <div class="offcanvas-header">
          <h5 class="offcanvas-title" id="offcanvasLabel">{{ brand }}</h5>
          <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div class="offcanvas-body">
          <ul class="navbar-nav flex-grow-1 justify-content-end">
            <li class="nav-item" v-for="link in links" :key="link.name">
              <router-link :to="link.to" class="nav-link">{{ link.name }}</router-link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </nav>
</template>

<style scoped>

</style>