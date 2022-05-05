<template>
  <div id="app" class="max-w-screen grid min-h-screen">
    <TheNavbar></TheNavbar>
    <main class="-mt-20 min-h-screen bg-gray-100 pt-20">
      <router-view />
    </main>
  </div>
</template>

<script setup>
import TheNavbar from "@/components/TheNavbar.vue";
import { provide } from "vue";
import { useStore } from "@/store";

const store = useStore();

const getToken = () => {
  var requestOptions = {
    method: "POST",
    redirect: "follow",
  };
  fetch("/.netlify/functions/getToken", requestOptions)
    .then((response) => response.text())
    .then((result) => {
      const res = JSON.parse(result);
      store.token = res.access_token;
      store.tokenexp = res[".expires"];
    })
    .catch((error) => console.log("error", error));
};

const rcm = async (method) => {
  let token = store.token;
  let tokenexpired = new Date(store.tokenExp).getTime() < new Date().getTime();
  if (tokenexpired) {
    console.log("refreshing token");
    this.getToken();
  }
  var requestOptions = {
    headers: {
      Authorization: "Bearer " + token,
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(method),
  };
  return await fetch("https://api.rentalcarmanager.com/v32/api", requestOptions)
    .then((response) => response.text())
    .then((result) => {
      // console.log(JSON.parse(result));
      return JSON.parse(result);
    });
};

provide("rcm", rcm);
provide("getToken", getToken);
</script>

<style lang="postcss">
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600&display=swap");
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
