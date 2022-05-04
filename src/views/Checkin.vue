<template>
  <div class="relative grid h-full content-start gap-5 bg-gray-300 py-10 px-2">
    <the-summary
      v-if="gotBooking"
      :bookinginfo="store.bookinginfo"
    ></the-summary>
    <checkin-steps @update="getBooking()" v-if="gotBooking"></checkin-steps>
  </div>
</template>

<script setup>
import { ref, computed, onBeforeMount, provide, inject } from "vue";
import { useStore } from "@/store";
import { useRouter } from "vue-router";
import TheSummary from "@/components/Summary.vue";
import CheckinSteps from "@/components/new/CheckinSteps.vue";

const rcm = inject("rcm");

const router = useRouter();
const store = useStore();
const loading = ref(true);
const ready = ref(false);

const gotBooking = computed(() => {
  if (store.bookinginfo.bookinginfo) return true;
});

function getCountries() {
  let method = {
    method: "countries",
  };
  rcm(method).then((results) => {
    store.countries = results.results;
  });
}

function getBooking() {
  let resref = store.resref;
  loading.value = true;
  ready.value = false;
  let params = {
    method: "bookinginfo",
    reservationref: resref,
  };
  rcm(params)
    .then((response) => {
      if (response.status == "OK") {
        if (
          response.results.bookinginfo[0].reservationstatus != "Reservation"
        ) {
          router.push({ name: "Home", query: { valid: false } });
        }
        loading.value = false;
        store.bookinginfo = response.results;
        ready.value = true;
      } else if (response.status == "ERR") {
        console.log(response.error);
        router.push({
          name: "home",
        });
      }
      if (response.Message) {
        console.log(response.Message);
        router.push({
          name: "Home",
        });
      }
      loading.value = false;
    })
    .catch((err) => {
      console.log("could't get booking info: " + err);
      router.push({
        name: "Home",
      });
    });
}

onBeforeMount(() => {
  console.log("checkin before mount");
  getCountries();
  getBooking();
});
</script>

<style lang="postcss">
.active {
  @apply from-blue-800 to-blue-900 shadow-blue-800/30;
}
</style>
