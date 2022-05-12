<template>
  <div class="relative gap-y-5 rounded border bg-white p-2 text-left">
    <loading-overlay v-if="loading"></loading-overlay>
    <p class="my-3 text-sm text-gray-500">
      Modify extra options on your booking. Please note you may not be able to
      downgrade of remove options you have previously selected. Please contact
      us if you wish to change these options.
    </p>
    <div v-if="availablefees">
      <div v-if="availablefees.optionalfees.length">
        <p class="my-3 text-xl font-bold">Optional Extras</p>
        <div v-for="item in availablefees.optionalfees" :key="item.id">
          <label :for="'option' + item.id" class="flex justify-between">
            <div>
              <input
                class="mr-2"
                type="checkbox"
                :name="'option' + item.id"
                :id="'option' + item.id"
                v-model="selectedoptions"
                :value="{ id: item.id, qty: item.qty || 1 }"
              />{{ item.name }}
            </div>
            <span>{{ currencysymbol + item.totalfeeamount }}</span>
          </label>
        </div>
      </div>
      <div v-if="availablefees.insuranceoptions.length">
        <p class="my-3 text-xl font-bold">Damage Cover</p>
        <div v-for="item in availablefees.insuranceoptions">
          <label :for="'km' + item.id" class="flex justify-between">
            <div>
              <input
                type="radio"
                :id="'km' + item.id"
                :name="'km' + item.id"
                v-model="selecteddamage"
                :value="item.id"
                class="mr-2"
              />{{ item.name }}
            </div>
            {{ currencysymbol + item.totalinsuranceamount }}</label
          >
        </div>
      </div>
      <div v-if="availablefees.kmcharges.length">
        <p class="my-3 text-xl font-bold">Daily Kilometre Options</p>
        <div v-for="item in availablefees.kmcharges" :key="item.id">
          <label :for="'km' + item.id" class="flex justify-between">
            <div>
              <input
                type="radio"
                :id="'km' + item.id"
                :name="'km' + item.id"
                v-model="selectedkm"
                :value="item.id"
                class="mr-2"
              />{{ item.description }}
            </div>
            {{ currencysymbol + item.totalamount }}</label
          >
        </div>
      </div>
    </div>
    <div class="my-5 grid place-items-center">
      <button v-show="changes.length" class="btn-green py-2 px-4">
        Save Changes
      </button>
    </div>
  </div>
</template>

<script setup>
import LoadingOverlay from "@/components/LoadingOverlay.vue";
import { useStore } from "@/store";
import { ref, inject, computed } from "vue";

const store = useStore();
const rcm = inject("rcm");
const loading = ref(false);
const currencysymbol = computed(
  () => store.bookinginfo.bookinginfo[0].currencysymbol
);
const availablefees = await rcm({
  method: "bookingoptions",
  reservationref: store.resref,
}).then((data) => {
  return data.results;
});

const changes = computed(() => {
  let diffs = [];
  if (initialkm.value != selectedkm.value) diffs.push("km");
  if (initialdamage.value != selecteddamage.value) diffs.push("damage");
  if (getDifference(initialoptions.value, selectedoptions.value).length)
    diffs.push("options");
  return diffs;
});

function getDifference(array1, array2) {
  return array1.filter((object1) => {
    return !array2.some((object2) => {
      return object1.id === object2.id;
    });
  });
}

const initialkm = computed(() => store.bookinginfo.bookinginfo[0].kmcharges_id);
const selectedkm = ref(initialkm.value);
const initialdamage = computed(
  () => store.bookinginfo.extrafees.find((el) => el.isinsurancefee).extrafeeid
);
const selecteddamage = ref(initialdamage.value);
const initialoptions = computed(() => {
  let arr = [];
  store.bookinginfo.extrafees.forEach((el) => {
    if (el.isoptionalfee && !el.isinsuranceoption) {
      arr.push({ id: el.extrafeeid, qty: el.qty });
    }
  });
  return arr;
});
const selectedoptions = ref(initialoptions.value);
</script>

<style lang="scss" scoped></style>
