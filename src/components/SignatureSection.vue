<template>
  <p class="col-span-full my-3 text-xl font-bold">E-signature</p>
  <p class="my-3 text-sm text-gray-500">Please read and sign each required area using your mouse, or finger/stylus if you are using a touch-screen device.</p>
  <div v-for="signature in signatureList" :key="signature.signaturetemplateid">
    <signature-block
      @update-signature="getSignatures"
      :signature="signature"
    ></signature-block>
  </div>
</template>

<script setup>
import SignatureBlock from "@/components/SignatureBlock.vue";
import { inject, onBeforeMount, ref, computed, watch } from "vue";
import { useStore } from "@/store";

const rcm = inject("rcm");

const store = useStore();

const props = defineProps({
  cid: Number,
});

const signatureList = ref([]);
const emit = defineEmits(['missing'])
const missing = computed(() => {
  return signatureList.value.filter((sig) => !sig.issigned).length;
});
watch(missing, (val)=> {
  emit('missing', val)
})

function getSignatures() {
  let params = {
    method: "signaturelist",
    reservationref: store.resref,
  };
  rcm(params)
    .then((res) => {
      signatureList.value = res.results.filter(
        (el) => el.customerid == props.cid
      );
    })
    .catch((err) => console.log(err));
}

onBeforeMount(() => {
  getSignatures();
});
</script>

<style lang="scss"></style>
