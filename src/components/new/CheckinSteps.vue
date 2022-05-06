<template>
  <div class="mx-auto flex w-full max-w-screen-md flex-col gap-5">
    <expand-section
      :toggle="showCustomer"
      :label="'Main Hirer'"
      @toggle="showCustomer = !showCustomer"
    >
      <modify-driver
        :key="customer.customerid"
        :customer="customer"
        :is-primary="true"
        @update="emit('update')"
      ></modify-driver>
    </expand-section>

    <expand-section
      v-if="extraDrivers.length"
      :toggle="showExtraDrivers"
      @toggle="showExtraDrivers = !showExtraDrivers"
      :label="'Extra Drivers'"
    >
      <modify-driver
        v-for="driver in extraDrivers"
        :key="driver.customerid"
        :customer="driver"
        @update="emit('update')"
      ></modify-driver
    ></expand-section>

    <expand-section
      v-if="extraDrivers.length < 4"
      :toggle="showNewDriver"
      @toggle="showNewDriver = !showNewDriver"
      :label="'Add New Driver'"
    >
      <modify-driver
        :newDriver="true"
        @update="emit('update'), (showNewDriver = false)"
      ></modify-driver>
    </expand-section>

    <expand-section
      :label="'Payment Method'"
      :toggle="showVault"
      @toggle="showVault = !showVault"
    >
      <card-vault></card-vault>
    </expand-section>
  </div>
</template>

<script setup>
import ModifyDriver from "@/components/new/ModifyDriver.vue";
import ExpandSection from "@/components/new/ExpandSection.vue";
import CardVault from "@/components/new/CardVault.vue";
import { ref, computed } from "vue";
import { useStore } from "@/store";

const emit = defineEmits(["update"]);

const store = useStore();

const showNewDriver = ref(false);
const showCustomer = ref(false);
const showExtraDrivers = ref(false);
const showVault = ref(false);

const customer = computed(() => {
  let customer = store.bookinginfo.customerinfo[0];
  delete customer.country;
  delete customer.fulladdress;
  return customer;
});
const extraDrivers = computed(() => store.bookinginfo.extradrivers);
</script>

<style lang="scss" scoped></style>
