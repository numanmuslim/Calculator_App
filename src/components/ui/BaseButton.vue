<template>
  <v-btn
    size="x-large"
    class="base-button"
    :class="{
      equal: value === '=',
      number: numbersBtn.find((btn) => btn === value),
    }"
    @click="$emit('inp', value)"
    block
    :disabled="isDisable"
    variant="text"
  >
    {{ value }}
  </v-btn>
</template>

<script>
export default {
  props: {
    value: String,
    isDisable: Boolean,
  },
  emits: ["inp"],
  data() {
    return {
      numbersBtn: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", ".", "+/-"],
    };
  },
};
</script>

<style scoped>
.equal {
  background-color: rgb(179, 3, 3) !important;
  color: white !important;
}
.number {
  background-color: white !important;
}
.base-button {
  font-size: 1.2rem;
  width: 100%;
  height: 100%;
  font-family: "Noto Sans JP", sans-serif;
  background-color: #f9f9f9;
}
</style>
