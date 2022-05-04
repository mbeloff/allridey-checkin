<template>
  <div class="rounded bg-blue-800">
    <button
      class="flex h-16 w-full items-center justify-between px-2 text-white md:px-5"
      @click="emit('toggle')"
    >
      <p v-if="label" class="text-center text-xl font-bold">
        {{ label }}
        <span v-if="actionRequired" class="text-sm font-normal text-orange-300"
          ><i class="far fa-warning"></i> action required</span
        >
      </p>
      <p v-else class="text-center text-xl font-bold">
        <span
          ><i class="fas fa-plus-circle text-green-500"></i> Add a Driver</span
        >
      </p>
      <i class="far fa-chevron-down" :class="{ 'rotate-180': toggle }"></i>
    </button>
    <div v-show="toggle" class="flex flex-col gap-5 px-2 pb-5 md:px-5">
      <slot></slot>
    </div>
  </div>
</template>
<script setup>
import { toRefs } from "vue";

const emit = defineEmits(["toggle"]);

const props = defineProps({
  toggle: Boolean,
  label: {
    type: String,
    default: null,
  },
  actionRequired: Boolean,
});

const { toggle, label, actionRequired } = toRefs(props);
</script>
<script>
import smoothReflow from "vue-smooth-reflow";

export default {
  mixins: [smoothReflow],
  mounted() {
    this.$smoothReflow();
  },
};
</script>

<style lang="scss" scoped></style>
