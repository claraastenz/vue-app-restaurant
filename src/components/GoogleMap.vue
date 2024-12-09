<script>
export default {
  name: "GoogleMap",
  props: {
    apiKey: {
      type: String,
      required: true,
    },
    latitude: {
      type: Number,
      required: true,
    },
    longitude: {
      type: Number,
      required: true,
    },
    zoom: {
      type: Number,
      default: 15,
    },
  },
  mounted() {
    this.initMap();
  },
  methods: {
    initMap() {
      if (!window.google || !window.google.maps) {
        const script = document.createElement("script");
        script.src = `https://maps.googleapis.com/maps/api/js?key=${this.apiKey}`;
        script.async = true;
        script.defer = true;
        script.onload = this.renderMap;
        document.head.appendChild(script);
      } else {
        this.renderMap();
      }
    },
    renderMap() {
      const map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: this.latitude, lng: this.longitude },
        zoom: this.zoom,
      });

      new google.maps.Marker({
        position: { lat: this.latitude, lng: this.longitude },
        map,
        title: "Cedar Grill",
      });
    },
  },
};
</script>

<template>
  <div class="google-map-container">
    <div id="map" class="google-map"></div>
  </div>
</template>

<style scoped>
.google-map-container {
  width: 100%;
  height: 400px;
  margin: 20px 0;
}
.google-map {
  width: 100%;
  height: 100%;
}
</style>