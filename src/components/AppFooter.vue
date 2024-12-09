<script>
import GoogleMap from "@/components/GoogleMap.vue";

export default {
  name: "AppFooter",
  props: {
    brand: { type: String, required: true },
    links: { type: Array, required: true },
    socials: { type: Array, required: true },
  },
  components: {
    GoogleMap,
  },
  data() {
    return {
      googleMapsApiKey: import.meta.env.VITE_API_KEY_THREE,
    };
  },
};
</script>

<template>
  <footer class="container py-5">
    <div class="row align-items-start">
      <H2>Cedar Grill & Lounge</H2>
      <div class="col-md-8">
        <div class="mb-3">
          <p class="fw-bold m-0">MONDAY - THURSDAY • 5 - 9 PM</p>
          <p class="fw-bold m-0">FRIDAY - SUNDAY • 11 AM - 2 PM &amp; 5 - 9 PM</p>
          <p class="fw-bold m-0">HAPPY HOUR MONDAY - FRIDAY • 4 - 5 PM</p>
        </div>

        <div class="mb-3 d-flex align-items-center">
          <i class="fas fa-phone me-2"></i>
          <span>414-395-4900</span>
        </div>
        <div class="mb-3 d-flex align-items-center">
          <i class="fas fa-map-marker-alt me-2"></i>
          <span>550 N. HARBOR DRIVE, MILWAUKEE</span>
        </div>
        <div class="mb-3 d-flex">
          <i class="fas fa-envelope me-2"></i>
          <div>
            <div>INFO@CEDARGRILL.COM</div>
            <div>MEDIA: PR@CEDARGRILL.COM</div>
          </div>
        </div>

        <hr />

        <div class="d-flex align-items-center">
          <a href="#" class="me-3 text-body-secondary" aria-label="Facebook">
            <i class="fab fa-facebook"></i>
          </a>
          <a href="#" class="me-3 text-body-secondary" aria-label="Instagram">
            <i class="fab fa-instagram fa-lg"></i>
          </a>
          <a href="#" class="me-3 text-body-secondary" aria-label="Google">
            <i class="fab fa-google fa-lg"></i>
          </a>
          <a href="#" class="me-3 text-body-secondary" aria-label="Yelp">
            <i class="fab fa-yelp fa-lg"></i>
          </a>
        </div>
      </div>

      <div class="col-md-4 mt-4 mt-md-0">
        <google-map
            :api-key="googleMapsApiKey"
            :latitude="43.038902"
            :longitude="-87.906471"
            :zoom="15"
        ></google-map>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.fw-bold {
  font-weight: bold;
}
</style>