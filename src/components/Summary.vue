<template>
  <div
    class="mx-auto mb-5 flex w-full max-w-screen-md flex-col justify-between rounded bg-gray-300 py-4 text-sm"
  >
    <p class="mb-5 font-bold">
      {{ store.resType }}:
      {{ bookinginfo.bookinginfo[0].reservationdocumentno }}
    </p>
    <p class="mb-5">
      {{ trip.vehiclecategory }}
    </p>

    <div class="mb-5 flex items-center font-bold">
      <span class="flex-grow text-right"
        >{{ trip.pickuplocationname }}<br />{{
          new Date(trip.pickupdate).toDateString()
        }}
      </span>
      <i class="fas fa-route fa-fw mx-4 text-lg text-blue-600"></i>
      <span class="flex-grow text-left"
        >{{ trip.pickuplocationname }}<br />{{
          new Date(trip.dropoffdate).toDateString()
        }}</span
      >
    </div>

    <div class="mx-auto mb-5 w-full max-w-[400px] px-2 text-xs">
      <div class="flex justify-between">
        <span>{{
          rate.numberofdays +
          " days @ " +
          trip.currencysymbol +
          rate.dailyrateafterdiscount +
          "/day"
        }}</span>
        <span>{{ trip.currencysymbol + rate.ratesubtotal }}</span>
      </div>
      <div
        class="flex justify-between"
        v-for="item in fees"
        :key="item.extrafeeid"
      >
        <span>{{ item.name }}</span
        ><span>{{ trip.currencysymbol + item.totalfeeamount }}</span>
      </div>
      <div class="mt-4 flex justify-between">
        <span>Total</span><span>{{ trip.totalcost }}</span>
      </div>
      <p class="mt-1 text-right">
        (includes GST of: {{ trip.currencysymbol + trip.gst }})
      </p>
    </div>
    <div v-if="store.resType != 'Quotation'" class="bg-gray-200">
      <div
        class="mx-auto flex w-full max-w-[400px] justify-between py-5 px-2 font-bold"
      >
        <span>Balance Due:</span
        ><span
          >{{ trip.currencyname + trip.currencysymbol
          }}{{ trip.balancedue }}</span
        >
      </div>
    </div>
  </div>
</template>

<script setup>
import { useStore } from "@/store.js";
const props = defineProps({
  bookinginfo: {
    type: Object,
    default: null,
  },
});

const store = useStore()

const trip = props.bookinginfo.bookinginfo[0];
const fees = props.bookinginfo.extrafees;
const rate = props.bookinginfo.rateinfo[0];
</script>

<script>
export default {
  // mounted() {
  //   let params = {
  //     method: "workflowchecklist",
  //     reservationref: this.trip.reservationref,
  //     workflowcode: "checkin",
  //   };
  //   Mixins.methods.postapiCall(params).then((res) => console.log(res));
  // },
};
</script>

<style lang="scss"></style>
