<template>
  <div class="relative flex h-full flex-col justify-center">
    <loading-overlay v-if="loading" class="z-10"></loading-overlay>
    <div class="my-2 h-12">
      <p v-show="error" class="text-center text-red-500">{{ error }}</p>
    </div>
    <form for="resno" class="mx-auto flex max-w-sm flex-col text-left">
      <label class="group flex flex-grow flex-col">
        <div class="relative flex flex-row place-items-center">
          <input
            id="resno"
            v-model="resno"
            :class="{ 'input-error': missinginput && !resno.length }"
            class="my-input uppercase"
            type="text"
            name="resno"
            placeholder="Reservation number"
          />
          <i class="form-i fal fa-book fa-fw absolute -left-5 -ml-2 mr-2"></i>
        </div>
      </label>
      <label for="lastname" class="group mt-2 flex flex-grow flex-col">
        <div class="relative flex flex-row place-items-center">
          <input
            id="lastname"
            v-model="lastname"
            :class="{ 'input-error': missinginput && !lastname.length }"
            class="my-input uppercase"
            type="text"
            name="lastname"
            placeholder="Last name"
          />
          <i class="form-i fal fa-user fa-fw absolute -left-5 -ml-2 mr-2"></i>
        </div>
      </label>
      <button
        class="group w-56 text-right text-4xl font-bold focus:outline-none"
        @click.prevent="findBooking(resno, lastname)"
      >
        <p class="mt-4 text-left text-4xl">online</p>
        <span>check in</span>
        <i
          class="fas fa-arrow-right z-0 transform align-middle transition duration-500 ease-out group-hover:translate-x-1 group-hover:text-blue-600"
        ></i>
      </button>
    </form>
  </div>
</template>
<script setup>
import LoadingOverlay from "@/components/LoadingOverlay.vue";
import { ref, computed, watch, onMounted, inject } from "vue";
import { useStore } from "@/store";
import { useRouter, useRoute } from "vue-router";

const router = useRouter();
const route = useRoute();
const store = useStore();

const resno = ref("88");
const lastname = ref("TEST");
const missinginput = ref(false);
const error = ref("");
const loading = ref(true);
const token = computed(() => store.token);

const rcm = inject("rcm");
const getToken = inject("getToken");

watch(token, (val) => {
  if (val) {
    loading.value = false;
  }
});

onMounted(() => {
  if (!store.token) {
    getToken();
  } else {
    loading.value = false;
  }
  if (route.query.validquote == "false") {
    error.value = "This quotation is no longer valid.";
  }
  if (route.query.validres == "false") {
    error.value = "Online checkin is no longer available for this reservation.";
  }
});

function findBooking(resno, lastname) {
  loading.value = true;
  error.value = "";
  let method = {
    method: "findbooking",
    reservationno: resno,
    lastname: lastname,
  };
  if (!resno || !lastname) {
    error.value = "Please enter reservation number and your last name.";
    missinginput.value = true;
    loading.value = false;
    return;
  }
  rcm(method)
    .then((res) => {
      if (res.status == "OK") {
        let resref = res.results[0].reservationref;
        store.resref = resref;
        router.push({ name: "Checkin" });
      } else if (res.status == "ERR") {
        throw res.error;
      }
    })
    .catch((err) => {
      this.loading = false;
      this.error = err;
      console.log("find booking (error): " + err);
    });
}
</script>

<style lang="postcss">
.btn-green {
  @apply rounded bg-green-500 text-sm text-white;
}
.btn-green:hover {
  @apply hover:bg-green-700 hover:text-green-200;
}
.btn-red {
  @apply rounded bg-red-500 text-sm text-white;
}
.btn-red:hover {
  @apply hover:bg-red-700 hover:text-red-200;
}
.input-error {
  @apply ring-2 ring-orange-400;
}
.my-input:focus + .form-i {
  @apply text-blue-600;
}
</style>
