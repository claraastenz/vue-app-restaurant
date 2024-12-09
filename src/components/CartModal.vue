<script>
export default {
  name: "CartModal",
  props: {
    title: { type: String, required: true },
    message: { type: String, required: true }
  },
}
</script>

<template>
  <div class="modal fade" id="cartModal" tabindex="-1" aria-labelledby="cartModalLabel" aria-hidden="true" v-if="message">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="cartModalLabel">{{ title }}</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" @click="$emit('update:message', '')"></button>
        </div>
        <div class="modal-body">
          {{ message }}
        </div>
      </div>
    </div>
  </div>

</template>

<style scoped>

</style>