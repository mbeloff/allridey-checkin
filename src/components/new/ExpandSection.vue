<template>
  <div
    class="rounded bg-gray-800"
    :class="{
      'ring-2 ring-orange-500 ring-offset-2': actionRequired,
    }"
  >
    <button
      class="flex h-16 w-full items-center justify-between rounded px-2 md:px-5"
      @click="emit('toggle')"
    >
      <p class="text-center text-xl text-white">
        {{ label }}
        <span v-if="actionRequired" class="text-lg font-normal text-orange-400"
          ><i class="far fa-warning"></i> action required</span
        >
        <span v-if="actionRequired == false"
          ><i class="far fa-check-circle text-green-500"></i
        ></span>
      </p>
      <i
        class="far fa-chevron-down text-white"
        :class="{ 'rotate-180': toggle }"
      ></i>
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

<style lang="postcss" scoped></style>
