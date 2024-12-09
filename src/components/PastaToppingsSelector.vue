<script>
export default {
  name: "PastaToppingsSelector",
  props: {
    modelValue: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    toggleTopping(topping) {
      const updatedToppings = [...this.modelValue];
      if (updatedToppings.includes(topping)) {
        updatedToppings.splice(updatedToppings.indexOf(topping), 1);
      } else {
        updatedToppings.push(topping);
      }
      this.$emit("update:modelValue", updatedToppings);
    },
  },
  computed: {
    toppingsOptions() {
      return ["Cheese", "Olives", "Mushrooms", "Peppers"];
    },
  },
};
</script>

<template>
  <div>
    <h3>Choose Your Toppings:</h3>
    <div v-for="topping in toppingsOptions" :key="topping">
      <input
          type="checkbox"
          :id="topping"
          :value="topping"
          :checked="modelValue.includes(topping)"
          @change="toggleTopping(topping)"
      />
      <label :for="topping">{{ topping }}</label>
    </div>
  </div>
</template>

<style scoped>

</style>