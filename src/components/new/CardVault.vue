<template>
  <div class="gap-y-5 rounded border bg-white p-2 text-left">
    <p class="my-3 text-sm text-gray-500">Safely store your credit card in our vault. Payment will only be taken once your vehicle has been confirmed.</p>
    <div class="relative py-5">
      <loading-overlay v-if="loading"></loading-overlay>
      <div v-if="vaultlist.length" class="grid grid-cols-4 border-b font-bold">
        <span>Type</span>
        <span>Name</span>
        <span>Card #</span>
        <span>Expiry</span>
      </div>
      <div
        class="grid grid-cols-4 odd:bg-gray-100"
        v-for="card in vaultlist"
        :key="card.dateadded"
      >
        <span> {{ card.cardtype }}</span>
        <span>{{ card.cardname }}</span>
        <span>{{ "**** " + card.lastfour }}</span>
        <span>{{ card.carddate }}</span>
      </div>
    </div>
    <button class="btn-green" @click="showVault = !showVault">
      <div v-if="!showVault"><i class="far fa-plus-circle"></i> Add a Card</div>
      <div v-else><i class="far fa-minus-circle"></i> Cancel</div>
    </button>
    <div v-if="showVault">
      <vault-entry @update="getVaultList()"></vault-entry>
    </div>
  </div>
</template>

<script setup>
import LoadingOverlay from "@/components/LoadingOverlay.vue";
import VaultEntry from "@/components/new/VaultEntry.vue";
import { ref, onBeforeMount, inject, watch } from "vue";
import { useStore } from "@/store";
import { valuesIn } from "lodash";

const store = useStore();
const rcm = inject("rcm");

const loading = ref(true);
const vaultlist = ref([]);
const showVault = ref(false);

const emit = defineEmits(["missing"]);

watch(vaultlist, () => {
  console.log(!vaultlist.value.length);
  emit("missing", { vault: !vaultlist.value.length });
});

onBeforeMount(() => {
  getVaultList();
});

function getVaultList() {
  loading.value = true;
  const params = {
    method: "vaultlist",
    reservationref: store.resref,
  };
  rcm(params).then((res) => {
    loading.value = false;
    vaultlist.value = res.results;
  });
}
</script>

<style lang="scss" scoped></style>
