<template>
  <div
    v-for="(signature, i) in signatureList"
    :key="signature.signaturetemplateid"
  >
    <signature-block
      @update-signature="getSignatures"
      :signature="signature"
    ></signature-block>
  </div>
</template>

<script setup>
import SignatureBlock from "@/components/SignatureBlock.vue";
import { inject, onBeforeMount } from "vue";
import { useStore } from "@/store";

const rcm = inject("rcm");

const store = useStore();

const props = defineProps({
  cid: Number,
});

const signatureList = ref([]);

const missing = computed(() => {
  return signatureList.value.filter((sig) => !sig.issigned).length;
});

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

<script>
// import Mixins from "@/Mixins.js";
// import LoadingOverlay from "@/components/LoadingOverlay.vue";
// import SignatureBlock from "@/components/SignatureBlock.vue";
export default {
  // props: {
  //   cid: { type: Number, required: true },
  // },
  // emits: ["update-section-status"],
  // components: {
  //   LoadingOverlay,
  //   SignatureBlock,
  // },
  // data() {
  //   return {
  //     signatureList: [],
  //   };
  // },
  // mixins: [Mixins],
  // beforeMount() {
  //   this.getSignatures();
  // },
  // watch: {
  //   signatureList: function (val) {
  //     let missing = false;
  //     val.forEach((el) => {
  //       if (!el.issigned) {
  //         missing = true;
  //       }
  //     });
  //     this.$emit("update-section-status", missing);
  //   },
  // },
  methods: {
    // getSignatures() {
    //   let params = {
    //     method: "signaturelist",
    //     reservationref: this.$store.state.resref,
    //   };
    //   Mixins.methods
    //     .postapiCall(params)
    //     .then((res) => {
    //       this.signatureList = res.results.filter(
    //         (el) => el.customerid == this.cid
    //       );
    //     })
    //     .catch((err) => console.log(err));
    // },
  },
};
</script>

<style lang="scss"></style>
