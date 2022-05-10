<template>
  <div class="relative z-10 h-20 w-full bg-gray-800 shadow-lg print:hidden">
    <div class="container mx-auto flex h-full px-2">
      <div class="flex w-full items-center justify-between gap-x-4">
        <div class="flex items-center">
          <a href="https://www.allridey.com.au" class="flex">
            <img
              src="../assets/allridey_text_outline.svg"
              alt="Go to Allridey homepage"
              class="mr-5 w-32 flex-grow"
            />
          </a>
          <router-link
            class="text-sm font-light text-blue-100 hover:text-blue-300"
            :to="{ name: 'Home' }"
            >Check-in</router-link
          >
        </div>

        <div>
          <a
            href="tel:0417740307"
            class="ml-auto min-w-max font-bold text-blue-300 hover:text-blue-600"
            >0417 740 307</a
          >
          <a
            href="https://www.allridey.com.au"
            class="shadow-inset mx-auto ml-4 max-w-max rounded bg-white bg-gradient-to-tr from-blue-400 to-blue-600 px-5 py-3 text-sm text-white shadow-lg shadow-blue-500/20 hover:from-blue-500/30 hover:to-blue-600/30 hover:text-blue-800"
            >Exit <i class="fal fa-person-to-portal ml-2"></i
          ></a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped></style>
