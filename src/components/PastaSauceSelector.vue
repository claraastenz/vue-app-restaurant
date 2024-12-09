<script>
export default {
  name: "PastaSauceSelector",
  props: {
    modelValue: {
      type: String,
      default: "",
    },
  },
  methods: {
    updateSauce(value) {
      this.$emit("update:modelValue", value);
    },
  },
  computed: {
    pastaSauceOptions() {
      return ["Marinara", "Alfredo", "Pesto", "Carbonara"];
    },
  },
};
</script>

<template>
  <div>
    <h3>Select Your Pasta Sauce:</h3>
    <div v-for="sauce in pastaSauceOptions" :key="sauce">
      <input
          type="radio"
          :id="sauce"
          :value="sauce"
          :checked="modelValue === sauce"
          @change="updateSauce(sauce)"
      />
      <label :for="sauce">{{ sauce }}</label>
    </div>
  </div>
</template>

<style scoped>

</style>