<script>
export default {
  name: "RestaurantCard",
  props: {
    imageSrc: {
      type: String,
      default: "/photos/mediterraneancuisine.jpg",
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    menuLink: {
      type: String,
      required: true,
    },
  },
};

</script>

<template>
  <div class="restaurant-card">
    <img :src="imageSrc" alt="Cedar Grill Dish" />
    <div class="restaurant-info">
      <h2>{{ title }}</h2>
      <p>{{ description }}</p>
      <a :href="menuLink" class="btn btn-primary">VIEW FOOD MENU</a>
    </div>
  </div>
</template>

<style scoped>

</style>