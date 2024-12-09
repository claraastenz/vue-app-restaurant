<script>
export default {
  name: "PastaBaseSelector",
  props: {
    modelValue: {
      type: String,
      default: "",
    },
  },
  methods: {
    updateBase(value) {
      this.$emit("update:modelValue", value);
    },
  },
  computed: {
    pastaBaseOptions() {
      return ["Spaghetti", "Penne", "Rigatoni"];
    },
  },
};
</script>

<template>
  <div>
    <h3>Choose Your Pasta Base:</h3>
    <div v-for="base in pastaBaseOptions" :key="base">
      <input
          type="radio"
          :id="base"
          :value="base"
          :checked="modelValue === base"
          @change="updateBase(base)"
      />
      <label :for="base">{{ base }}</label>
    </div>
  </div>
</template>

<style scoped>

</style>