<script setup>
import NavBar from '@/components/TheNavBar.vue'
</script>

<template>
  <div id="app" class="max-w-screen grid min-h-screen">
    <NavBar></NavBar>
    <main class="-mt-20 min-h-screen bg-gray-100 pt-20">
      <router-view />
    </main>
  </div>
</template>

<style lang="postcss">
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600&display=swap');
#app {
  font-family: "Poppins", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.my-input {
  @apply flex-1 rounded border bg-gray-200 py-3 pl-2;
}
.my-input:focus {
  @apply outline-none ring-2 ring-blue-500;
}
</style>
