<script>
export default {
  name: "SkeletonLoader",
  props: {
    count: {
      type: Number,
      default: 6
    }
  }
};
</script>

<template>
  <div class="row">
    <div class="col-md-4" v-for="n in count" :key="n">
      <div class="card skeleton-card">
        <div class="card-img-top skeleton skeleton-img"></div>
        <div class="card-body">
          <h5 class="card-title skeleton skeleton-text"></h5>
          <p class="card-text skeleton skeleton-text"></p>
          <p class="card-text skeleton skeleton-text"></p>
          <div class="btn-group">
            <span class="btn skeleton skeleton-btn"></span>
            <span class="btn skeleton skeleton-btn"></span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.skeleton {
  background-color: #eee;
  position: relative;
  overflow: hidden;
}

.skeleton-img {
  width: 100%;
  height: 200px;
  border-radius: 0.25rem 0.25rem 0 0;
}

.skeleton-text {
  height: 1em;
  width: 80%;
  margin-bottom: 0.75rem;
  border-radius: 4px;
}

.skeleton-btn {
  display: inline-block;
  width: 80px;
  height: 2rem;
  margin-right: 0.5rem;
  border-radius: 4px;
}

.skeleton::after {
  content: "";
  display: block;
  position: absolute;
  top: 0;
  left: -150px;
  height: 100%;
  width: 150px;
  background: linear-gradient(to right, #eee 0%, #ddd 50%, #eee 100%);
  animation: loading 1.5s infinite;
}

@keyframes loading {
  0% {
    left: -150px;
  }
  50% {
    left: calc(100% + 150px);
  }
  100% {
    left: calc(100% + 150px);
  }
}
</style>