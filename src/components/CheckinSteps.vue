<template>
  <div class="flex w-full flex-col gap-2">
    <expand-section
      :toggle="tab == 'main'"
      :label="'Customer Details'"
      @toggle="toggle('main')"
      :actionRequired="
        hasMissing(customer.customerid) || store.status == 'Reservation Request'
      "
    >
      <modify-driver
        :key="customer.customerid"
        :customer="customer"
        :is-primary="true"
        @update="emit('update')"
      ></modify-driver>

      <modify-uploads
        v-if="store.mode == 2"
        :cid="customer.customerid"
      ></modify-uploads>
      <modify-signatures
        v-if="store.mode == 2"
        :cid="customer.customerid"
        :tabopen="tab == 'main'"
      ></modify-signatures>
    </expand-section>

    <expand-section
      v-if="store.mode == 2"
      :toggle="tab == 'extras'"
      @toggle="toggle('extras')"
      :label="'Extra Drivers'"
      :actionRequired="hasMissing()"
    >
      <add-driver
        @update="emit('update')"
        v-if="extraDrivers.length < 4 && store.mode == 2"
      ></add-driver>
      <template v-for="(driver, i) in extraDrivers" :key="driver.customerid">
        <div class="rounded bg-gray-700 px-2 py-1 text-gray-400">
          Extra Driver #{{ i + 1 }}
        </div>
        <modify-driver
          :is-extra="true"
          :customer="driver"
          @update="emit('update')"
        ></modify-driver>
        <modify-uploads :cid="driver.customerid"></modify-uploads>
        <modify-signatures
          v-if="store.mode == 2"
          :cid="driver.customerid"
          :tabopen="tab == 'extras'"
        ></modify-signatures>
      </template>
    </expand-section>

    <expand-section
      :toggle="tab == 'fees'"
      @toggle="toggle('fees')"
      :label="'Booking Options'"
      :actionRequired="null"
    >
      <modify-trip @update="emit('update')"></modify-trip>
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
      <card-vault @update="emit('update')"></card-vault>
    </expand-section>
  </div>
</template>

<script setup>
import ModifyDriver from "@/components/ModifyDriver.vue";
import ModifyTrip from "@/components/ModifyTrip.vue";
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
