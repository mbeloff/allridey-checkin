<template>
  <div class="mx-auto flex w-full max-w-screen-md flex-col gap-5">
    <expand-section
      :toggle="tab == 'main'"
      :label="'Main Hirer'"
      @toggle="toggle('main')"
      :actionRequired="hasMissing(customer.customerid)"
    >
      <modify-driver
        :key="customer.customerid"
        :customer="customer"
        :is-primary="true"
        @update="emit('update')"
      ></modify-driver>

      <modify-uploads :cid="customer.customerid"></modify-uploads>

      <modify-signatures :cid="customer.customerid"></modify-signatures>
    </expand-section>

    <expand-section
      v-if="extraDrivers.length && store.mode == 2"
      :toggle="tab == 'extras'"
      @toggle="toggle('extras')"
      :label="'Extra Drivers'"
      :actionRequired="hasMissing()"
    >
      <template v-for="driver in extraDrivers" :key="driver.customerid">
        <modify-driver
          :is-extra="true"
          :customer="driver"
          @update="emit('update')"
        ></modify-driver>
        <modify-uploads :cid="driver.customerid"></modify-uploads>
        <modify-signatures :cid="driver.customerid"></modify-signatures>
      </template>
    </expand-section>

    <expand-section
      v-if="extraDrivers.length < 4 && store.mode == 2"
      :toggle="tab == 'add'"
      @toggle="toggle('add')"
      :label="'Add New Driver'"
      :actionRequired="null"
    >
      <add-driver @update="emit('update')"></add-driver>
    </expand-section>

    <expand-section
      :toggle="tab == 'fees'"
      @toggle="toggle('fees')"
      :label="'Booking Options'"
      :actionRequired="null"
    >
      <suspense>
        <modify-fees @update="emit('update')"></modify-fees>
      </suspense>
    </expand-section>

    <expand-section
      :label="'Payment Method'"
      :toggle="tab == 'vault'"
      @toggle="toggle('vault')"
      :actionRequired="store.missing.vault"
    >
      <card-vault></card-vault>
    </expand-section>
  </div>
</template>

<script setup>
import ModifyDriver from "@/components/ModifyDriver.vue";
import AddDriver from "@/components/AddDriver.vue";
import ExpandSection from "@/components/ExpandSection.vue";
import CardVault from "@/components/CardVault.vue";
import ModifyFees from "@/components/ModifyFees.vue";
import ModifyUploads from "@/components/ModifyUploads.vue";
import ModifySignatures from "./ModifySignatures.vue";
import { ref, computed } from "vue";
import { useStore } from "@/store";

const emit = defineEmits(["update"]);

const store = useStore();
const showNewDriver = ref(false);
const showCustomer = ref(false);
const showExtraDrivers = ref(false);
const showVault = ref(false);
const showFees = ref(false);

const tab = ref("");

function toggle(clicked) {
  if (tab.value == clicked) {
    tab.value = "";
  } else {
    tab.value = clicked;
  }
}

function hasMissing(cid) {
  if (store.missing.customers.hasOwnProperty(cid)) {
    return (
      store.missing.customers[cid].uploads > 0 ||
      store.missing.customers[cid].signatures > 0
    );
  } else {
    return (
      Object.values(store.missing.customers).some(
        (val) => val.extra && val.uploads
      ) > 0 ||
      Object.values(store.missing.customers).some(
        (val) => val.extra && val.signatures
      ) > 0
    );
  }
}

const customer = computed(() => {
  let customer = store.bookinginfo.customerinfo[0];
  delete customer.country;
  delete customer.fulladdress;
  return customer;
});

const extraDrivers = computed(() => store.bookinginfo.extradrivers);
</script>

<style lang="scss" scoped></style>
