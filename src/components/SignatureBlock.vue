<template>
  <div class="mb-2 flex flex-col gap-1">
    <div class="max-w-[400px]">
      <div class="relative" v-if="showSig">
        <loading-overlay v-if="loading"></loading-overlay>
        <VueSignaturePad
          class="aspect-[4/1] max-w-[400px] rounded border border-orange-500"
          :ref="sigid"
          :options="{ onBegin }"
          :scaleToDevicePixelRatio="false"
        />
        <div
          class="absolute bottom-0 flex w-max items-center gap-2 rounded-bl rounded-tr border border-orange-500 bg-white px-1 text-xs text-orange-500"
        >
          <span> signature required</span>
          <i class="fas fa-warning"></i>
        </div>
      </div>
      <div v-if="started && !saved" class="mt-2 grid grid-cols-2 gap-2">
        <button class="btn-green" @click="save">Submit</button>
        <button class="btn-red" @click="clear">Clear</button>
      </div>
      <div class="relative" v-if="props.signature.pngsig && sigid">
        <div
          :id="sigid"
          class="aspect-[4/1] max-w-[400px] rounded border border-green-500 bg-cover bg-no-repeat"
        ></div>
        <div
          class="absolute bottom-0 flex w-max items-center gap-2 rounded-bl rounded-tr border border-green-500 bg-white px-1 text-xs text-green-600"
        >
          <span> signed: {{ props.signature.signeddatetime }}</span>
          <i class="fas fa-check-circle"></i>
        </div>
      </div>
    </div>

    <div class="text-xs text-gray-600">
      <p v-if="props.signature.signaturetemplateid == 0">
        I, {{ props.fullname }}, hereby agree to the terms and conditions of
        <a class="text-blue-500" target="_blank" :href="agreement" download
          >the Vehicle Rental Agreement</a
        >
        and any other terms and conditions that are attached.
      </p>
      <p v-else v-html="props.signature.signaturetemplatetext"></p>
    </div>
  </div>
</template>

<script setup>
import LoadingOverlay from "@/components/LoadingOverlay.vue";
import { inject, onMounted, onUpdated, ref, computed } from "vue";
import { useStore } from "@/store";

const store = useStore();
const rcm = inject("rcm");
const emit = defineEmits(["updateSignature"]);
const props = defineProps({
  signature: Object,
  fullname: String,
  tabopen: Boolean,
});
const started = ref(false);
const loading = ref(false);
const saved = ref(false);
const agreement = computed(() => store.bookinginfo.bookinginfo[0].agreementurl);
const showSig = computed(() => {
  return !props.signature.issigned && !saved.value;
});
const sigid = computed(() => {
  let str =
    "c" +
    props.signature.customerid +
    "s" +
    props.signature.signaturetemplateid;
  return str;
});

function setPng() {
  if (props.signature.issigned && props.signature.pngsig) {
    document.getElementById(sigid.value).style.backgroundImage =
      "url(data:image/png;base64," + props.signature.pngsig + ")";
  }
}
onMounted(() => {
  setPng();
});
onUpdated(() => {
  setPng();
});
</script>

<script>
export default {
  watch: {
    showSig: function (value) {
      this.$nextTick(function () {
        this.pad.resizeCanvas();
      });
    },
  },
  computed: {
    pad() {
      return this.$refs[this.sigid];
    },
    showSig() {
      return !this.props.signature.issigned && !this.saved;
    },
  },
  methods: {
    onBegin() {
      console.log("---started---");
      this.pad.resizeCanvas();
      this.started = true;
    },
    clear() {
      this.pad.clearSignature();
    },
    async save() {
      let isExtraDriver =
        this.store.bookinginfo.customerinfo[0].customerid !=
        this.props.signature.customerid;
      const { isEmpty, data } = this.pad.saveSignature();
      console.log(isEmpty);
      console.log(data);
      let resized = await this.resizedataURL(data, 200, 50);

      let split = resized.split(",");
      let base64 = split[1];
      console.log(resized);
      let params = {
        method: "savesignature",
        reservationref: this.store.resref,
        signaturetemplateid: this.props.signature.signaturetemplateid,
        signaturepng: base64,
        extradriverid: isExtraDriver ? this.props.signature.customerid : "",
      };
      if (!isEmpty) {
        this.rcm(params).then((res) => {
          console.log(res);
          if (res.results.savesignature == true) {
            console.log("signature saved successfully");
            this.emit("updateSignature");
            this.saved = true;
          }
        });
      }
    },
    resizedataURL(datas, wantedWidth, wantedHeight) {
      return new Promise(async function (resolve, reject) {
        var img = document.createElement("img");
        img.onload = function () {
          var canvas = document.createElement("canvas");
          var ctx = canvas.getContext("2d");
          canvas.width = wantedWidth;
          canvas.height = wantedHeight;
          ctx.drawImage(this, 0, 0, wantedWidth, wantedHeight);
          var dataURI = canvas.toDataURL();

          resolve(dataURI);
        };
        img.src = datas;
      });
    },
  },
};
</script>
