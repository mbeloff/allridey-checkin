<template>
  <div class="relative z-10 h-20 w-full bg-gray-800 shadow-lg print:hidden">
    <div class="max-w-screen-lg mx-auto flex h-full justify-between px-2">
      <div class="left flex w-full content-center items-center gap-x-4">
        <a href="/" class="left flex -ml-2">
          <img
            src="../assets/allridey_text_outline.svg"
            alt="Go to Allridey homepage"
            class="mr-5 w-32 flex-grow"
          />
        </a>
        <div class="hidden h-full w-full flex-grow items-center md:flex">
          <a href="/" class="font-light text-gray-300 hover:text-blue-400"
            >Find Booking</a
          >

          <a
            href="tel:0417740307"
            class="ml-auto min-w-max font-bold text-gray-300 hover:text-blue-400"
            >0417 740 307</a
          >
          <a
            href="https://www.allridey.com.au"
            class="shadow-inset ml-5 max-w-max rounded bg-white bg-gradient-to-tr from-blue-400 to-blue-600 px-5 py-3 text-white shadow-lg shadow-blue-500/20 hover:from-blue-500/30 hover:to-blue-600/30 hover:text-blue-800"
            >Exit <i class="fad fa-person-to-portal fa-fw ml-2"></i
          ></a>
        </div>
      </div>
      <div
        class="mr-1 flex h-full place-items-center text-blue-300/80 md:hidden"
        @click="expand = !expand"
      >
        <a
          href="tel:0417740307"
          class="hover:blue-600 ml-auto mr-4 min-w-max font-bold text-blue-100/80"
          >0417 740 307</a
        >
        <i v-if="!expand" class="fal fa-bars fa-2x fa-fw"></i>
        <i v-if="expand" class="fal fa-times fa-2x fa-fw"></i>
      </div>
    </div>
    <transition name="slide">
      <div
        v-if="expand"
        class="top-100 absolute flex w-full flex-col gap-4 bg-gray-200 py-5 shadow-xl md:hidden"
      >
        <a class="text-gray-700 hover:text-blue-500" href="/">Find Booking</a>

        <a
          href="https://www.allridey.com.au"
          class="shadow-inset mx-auto max-w-max rounded bg-white bg-gradient-to-tr from-blue-400 to-blue-600 px-5 py-3 text-sm text-white shadow-lg shadow-blue-500/20 hover:from-blue-500/30 hover:to-blue-600/30 hover:text-blue-800"
          >Exit <i class="fal fa-person-to-portal ml-2"></i
        ></a>
      </div>
    </transition>
  </div>
</template>
<script setup>
import { useRoute } from "vue-router";
import { watch, ref } from "vue";

const expand = ref(false);
const route = useRoute();
watch(route, () => {
  expand.value = false;
});
</script>

<style lang="postcss">
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.5s ease, opacity 0.35s ease;
}

.slide-enter-from,
.slide-leave-to {
  transform: translateX(-100%);
  opacity: 0;
}
</style>
