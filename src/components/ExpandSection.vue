<template>
  <div
    class="rounded bg-gray-800"
    :class="{
      'ring-2 ring-orange-500/70': actionRequired,
    }"
  >
    <button
      class="flex h-16 w-full items-center justify-between rounded px-2 md:px-5"
      @click="emit('toggle')"
    >
      <p class="text-left text-xl text-blue-100/90">
        {{ label }}
        <span v-if="actionRequired" class="text-lg font-normal text-orange-400"
          ><i class="far fa-warning mr-2"></i>action required</span
        >
        <span v-else><i class="far fa-check-circle text-green-500"></i></span>
      </p>
      <i
        class="far fa-chevron-down text-white"
        :class="{ 'rotate-180': toggle }"
      ></i>
    </button>
    <transition name="fade">
      <div v-show="toggle" class="flex flex-col gap-5 px-2 pb-5 md:px-5">
        <slot></slot>
      </div>
    </transition>
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
    this.$smoothReflow({
      property: ["height"],
      transition: "height 1s ease-in-out",
    });
  },
};
</script>

<style lang="postcss" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
