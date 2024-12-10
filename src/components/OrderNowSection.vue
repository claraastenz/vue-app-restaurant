<script>
export default {
  name: "OrderNowSection",
  props: {
    headingText: {
      type: String,
      default: "Order Now",
    },
    buttonText: {
      type: String,
      default: "View Menu",
    },
    link: {
      type: String,
      default: "menu.html",
    },
    imageSrc: {
      type: String,
      default: "/photos/restaurant.jpg.png",
    },
    weatherSuggestion: {
      type: String,
      default: "",
    },
    recommendedDishes: {
      type: Array,
      default: () => [],
    },
    addToCart: {
      type: Function,
      required: true,
    },
  },
  methods: {
    showNutritionModal(item) {
      this.$emit('show-details', item);
    },
  },
};
</script>

<template>
  <div class="position-relative overflow-hidden text-center bg-body-tertiary">
    <div class="col-md-12 p-lg-5 mx-auto my-5 text-overlay">
      <h1 class="display-3 fw-bold">
        <router-link :to="link" class="text-decoration-none text-light">{{ headingText }}</router-link>
      </h1>
      <router-link :to="link" class="btn btn-primary">{{ buttonText }}</router-link>

      <div class="d-flex justify-content-between align-items-start mt-3">

        <div class="weather-widget flex-shrink-0 me-4">
          <p v-if="weatherSuggestion">{{ weatherSuggestion }}</p>
          <p v-else>Loading weather suggestion...</p>

          <div
              data-meteomatics-weather-widget="vertical"
              data-meteomatics-weather-widget-color="white"
              data-meteomatics-weather-widget-title="Milwaukee, Wisconsin, United States of America"
              data-meteomatics-weather-widget-latitude="43.038648"
              data-meteomatics-weather-widget-longitude="-87.909075"
              data-meteomatics-weather-widget-measurement-unit-temperature="fahrenheit"
          >
            <a href="https://www.meteomatics.com">Meteomatics Weather Widget</a>
          </div>
        </div>

        <div class="recommended-dishes flex-grow-1">
          <h5>Recommended Dishes:</h5>
          <div id="recommendedDishesCarousel" class="carousel slide" data-bs-ride="carousel">
            <div class="carousel-inner">
              <div
                  class="carousel-item"
                  v-for="(dish, index) in recommendedDishes"
                  :key="dish.id"
                  :class="{ active: index === 0 }"
              >
                <div class="card h-100 mx-auto" style="width: 18rem;">
                  <img :src="dish.image" class="card-img-top" :alt="dish.name" />
                  <div class="card-body">
                    <h5 class="card-title">{{ dish.name }}</h5>
                    <p class="card-text">{{ dish.description }}</p>
                    <p class="card-text"><strong>$ {{ dish.price.toFixed(2) }}</strong></p>
                    <button class="btn btn-primary" @click="addToCart(dish)">Add to Cart</button>
                    <button
                        class="btn btn-info"
                        @click="showNutritionModal(dish)"
                    >
                      Details
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <button
                class="carousel-control-prev"
                type="button"
                data-bs-target="#recommendedDishesCarousel"
                data-bs-slide="prev"
            >
              <span class="carousel-control-prev-icon" aria-hidden="true"></span>
              <span class="visually-hidden">Previous</span>
            </button>
            <button
                class="carousel-control-next"
                type="button"
                data-bs-target="#recommendedDishesCarousel"
                data-bs-slide="next"
            >
              <span class="carousel-control-next-icon" aria-hidden="true"></span>
              <span class="visually-hidden">Next</span>
            </button>
          </div>
        </div>

      </div>

    </div>
    <img :src="imageSrc" class="d-block w-100" alt="Inside of restaurant" />
  </div>
</template>

<style scoped>
.weather-widget {
  background-color: transparent;
  padding: 1rem;
  border-radius: 10px;
  margin-left: auto;
  margin-right: 0;
}
.recommended-dishes {
  flex-grow: 1;
  max-width: 900px;
}

.card {
  background-color: #f8f9fa;
  border: 1px solid #e0e0e0;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.card img {
  height: 150px;
  object-fit: cover;
  border-bottom: 1px solid #ddd;
}
.card-title {
  font-size: 1rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
}
.card-text {
  font-size: 0.85rem;
  color: #6c757d;
}

</style>