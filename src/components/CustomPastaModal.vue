<script>
export default {
  name: "CustomPastaModal",
  props: {
    title: {
      type: String,
      default: "Item Added to Cart",
    },
    pastaDetails: {
      type: Object,
      required: true,
    },
    visible: {
      type: Boolean,
      required: true,
    },
  },
  emits: ["close"],
  methods: {
    closeModal() {
      this.$emit("close");
    },
  },
};
</script>

<template>
  <div v-if="visible" class="modal-overlay" @click.self="closeModal">
    <div class="modal-content">
      <h3 class="modal-title">{{ title }}</h3>
      <div class="modal-body">
        <p><strong>Base:</strong> {{ pastaDetails.base }}</p>
        <p><strong>Sauce:</strong> {{ pastaDetails.sauce }}</p>
        <p><strong>Toppings:</strong> {{ pastaDetails.toppings || "None" }}</p>
        <p><strong>Price:</strong> ${{ pastaDetails.price.toFixed(2) }}</p>
      </div>
      <button class="btn btn-primary" @click="closeModal">Close</button>
    </div>
  </div>
</template>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
  max-width: 500px;
  width: 90%;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
}

.modal-title {
  font-size: 1.8rem;
  font-weight: bold;
  margin-bottom: 15px;
}

.modal-body p {
  font-size: 1.2rem;
  margin-bottom: 10px;
}

.modal-content button {
  background-color: #ff7043;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s ease;
}

.modal-content button:hover {
  background-color: #ff5722;
}
</style>