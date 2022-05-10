<template>
  <div class="relative gap-y-5 rounded border bg-white p-2 text-left">
    <loading-overlay v-if="savingChanges"></loading-overlay>
    <p class="my-3 text-xl font-bold">Driver Details</p>
    <p v-if="newDriver" class="my-3 text-sm text-gray-500">You may add up to 4 additional drivers to your booking. All drivers will need to sign the rental agreement and provide a copy of their driver's license.</p>
    <p v-else class="my-3 text-sm text-gray-500">Please check that all details are correct.</p>
    <div class="grid grid-cols-1 gap-2 md:grid-cols-2">
      <div class="group flex flex-grow flex-col">
        <label :for="'fName' + cid" class="my-label">First Name</label>
        <input
          :id="'fName' + cid"
          v-model="data.firstname"
          maxlength="30"
          required
          type="text"
          class="my-input"
          :disabled="isPrimary"
          :class="{ 'text-gray-400': isPrimary }"
          placeholder="required"
        />
      </div>
      <div class="group flex flex-grow flex-col">
        <label :for="'lName' + cid" class="my-label">Last Name</label>
        <input
          :id="'lName' + cid"
          v-model="data.lastname"
          maxlength="40"
          required
          type="text"
          class="my-input"
          :disabled="isPrimary"
          :class="{ 'text-gray-400': isPrimary }"
          placeholder="required"
        />
      </div>
      <div class="group flex flex-grow flex-col">
        <label :for="'email' + cid" class="my-label">Email</label>
        <input
          :id="'email' + cid"
          v-model="data.email"
          maxlength="50"
          required
          type="email"
          class="my-input"
          :disabled="isPrimary"
          :class="{ 'text-gray-400': isPrimary }"
          placeholder="required"
        />
      </div>
      <div class="group flex flex-grow flex-col">
        <label :for="'phone' + cid" class="my-label">Phone</label>
        <input
          :id="'phone' + cid"
          v-model="data.mobile"
          maxlength="25"
          required
          type="tel"
          class="my-input"
        />
      </div>

      <date-picker
        v-model="dateofbirth"
        :max-date="new Date()"
        :update-on-input="false"
        class="group flex flex-grow flex-col"
      >
        <template #default="{ inputValue, inputEvents }">
          <label :for="'dob' + cid" class="my-label">Date of Birth</label>
          <div class="flex flex-row place-items-center">
            <i class="fal fa-calendar fa-fw mr-2"></i>
            <input
              :id="'dob' + cid"
              class="my-input w-8"
              :value="inputValue"
              v-on="inputEvents"
            />
          </div>
        </template>
      </date-picker>

      <div class="group flex flex-grow flex-col">
        <label :for="'licenseno' + cid" class="my-label">License #</label>
        <input
          :id="'licenseno' + cid"
          v-model="data.licenseno"
          maxlength="70"
          type="text"
          class="my-input"
        />
      </div>

      <date-picker
        v-model="licenseexpires"
        :min-date="new Date()"
        :update-on-input="false"
        class="group flex flex-grow flex-col"
      >
        <template #default="{ inputValue, inputEvents }">
          <label :for="'licexp' + cid" class="my-label">License Expiry</label>
          <div class="flex flex-row place-items-center">
            <i class="form-i fal fa-calendar fa-fw mr-2"></i>
            <input
              :id="'licexp' + cid"
              class="my-input w-8"
              :value="inputValue"
              v-on="inputEvents"
            />
          </div>
        </template>
      </date-picker>
      <div class="group flex flex-grow flex-col">
        <label :for="'licenseissued' + cid" class="my-label"
          >License Issued In</label
        >
        <select
          :id="'licenseissued' + cid"
          v-model="data.licenseissued"
          class="my-input"
        >
          <option
            v-for="country in countries"
            :key="country.id"
            :value="country.country"
          >
            {{ country.country }}
          </option>
        </select>
      </div>

      <div class="group flex flex-grow flex-col">
        <label :for="'address' + cid" class="my-label">Street Address</label>
        <input
          :id="'address' + cid"
          v-model="data.address"
          maxlength="80"
          type="text"
          class="my-input"
        />
      </div>
      <div class="group flex flex-grow flex-col">
        <label :for="'city' + cid" class="my-label">City</label>
        <input
          :id="'city' + cid"
          v-model="data.city"
          maxlength="50"
          type="text"
          class="my-input"
        />
      </div>
      <div class="group flex flex-col">
        <label :for="'state' + cid" class="my-label">State</label>
        <input
          :id="'state' + cid"
          v-model="data.state"
          maxlength="30"
          type="text"
          class="my-input"
        />
      </div>
      <div class="group flex flex-col">
        <label :for="'country' + cid" class="my-label">Country</label>
        <select :id="'country' + cid" v-model="data.countryid" class="my-input">
          <option
            v-for="country in countries"
            :key="country.id"
            :value="country.id"
          >
            {{ country.country }}
          </option>
        </select>
      </div>
      <div class="group flex flex-grow flex-col md:mb-0">
        <label :for="'postcode' + cid" class="my-label">Postcode</label>
        <input
          :id="'postcode' + cid"
          v-model="data.postcode"
          maxlength="10"
          type="text"
          class="my-input"
        />
      </div>

      <div class="mt-auto grid h-9 grid-cols-2 gap-3">
        <button
          v-if="!newDriver && !isPrimary"
          class="btn-red"
          @click="deleteExtraDriver(-data.customerid)"
        >
          Delete Driver <i class="fas fa-trash-can-xmark"></i>
        </button>
        <button
          v-if="!isPrimary && unsaved.length"
          class="btn-green col-start-2"
          @click="addExtraDriver(data.customerid)"
        >
          {{ !newDriver ? "Update" : "Add" }}
          <i class="far fa-cloud-upload"></i>
        </button>
        <button
          v-if="isPrimary && unsaved.length"
          class="btn-green col-start-2"
          @click="editBooking()"
        >
          Save Changes <i class="far fa-cloud-upload"></i>
        </button>
      </div>
    </div>
  </div>
  <div
    v-if="!newDriver"
    class="relative gap-y-5 rounded border bg-white p-2 text-left"
  >
    <loading-overlay v-if="savingChanges"></loading-overlay>
    <modify-uploads
      :cid="data.customerid"
      @missing="missing($event, 'uploads')"
    ></modify-uploads>
  </div>
  <div
    v-if="!newDriver"
    class="relative gap-y-5 rounded border bg-white p-2 text-left"
  >
    <loading-overlay v-if="savingChanges"></loading-overlay>
    <signature-section
      :cid="customer.customerid"
      @missing="missing($event, 'signatures')"
    ></signature-section>
  </div>
</template>

<script setup>
import LoadingOverlay from "@/components/LoadingOverlay.vue";
import ModifyUploads from "@/components/ModifyUploads.vue";
import SignatureSection from "@/components/SignatureSection.vue";
import "v-calendar/dist/style.css";
import { ref, computed, inject, watch, onMounted } from "vue";
import { useStore } from "@/store";

const rcm = inject("rcm");
const store = useStore();
const cid = computed(() => props.customer.customerid);
const countries = computed(() => store.countries);
const savingChanges = ref(false);
const data = ref({});
const dateofbirth = ref(new Date());
const licenseexpires = ref(new Date());
const missinguploads = ref(0);
const missingsignatures = ref(0);
const unsaved = computed(() => {
  let diffs = Object.keys(data.value).filter((key) => {
    return data.value[key] !== props.customer[key];
  });
  return diffs;
});

function missing($event, type) {
  if (type == "uploads") {
    missinguploads.value = $event;
  }
  if (type == "signatures") {
    missingsignatures.value = $event;
  }
  emit("missing", { uploads: missinguploads, signatures: missingsignatures });
}

const emit = defineEmits(["update", "missing"]);

const props = defineProps({
  newDriver: {
    type: Boolean,
    default: false,
  },
  isPrimary: {
    type: Boolean,
    default: false,
  },
  customer: {
    type: Object,
    default() {
      return {
        customerid: 0,
        firstname: "",
        lastname: "",
        dateofbirth: "1/JAN/2000",
        email: "",
        phone: "",
        mobile: "",
        address: "",
        city: "",
        state: "",
        postcode: "",
        countryid: 7,
        country: "Australia",
        licenseno: "",
        licenseexpires: "",
        licenseissued: "Australia",
      };
    },
  },
});

function setDates() {
  dateofbirth.value = new Date(props.customer.dateofbirth);
  if (props.customer.licenseexpires == "") {
    licenseexpires.value = new Date();
  } else licenseexpires.value = new Date(props.customer.licenseexpires);
}

onMounted(() => {
  data.value = JSON.parse(JSON.stringify(props.customer));
  setDates();
});

watch(dateofbirth, (val) => {
  data.value.dateofbirth = new Date(val)
    .toLocaleDateString("en-AU", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    })
    .replaceAll(" ", "/");
});
watch(licenseexpires, (val) => {
  data.value.licenseexpires = new Date(val)
    .toLocaleDateString("en-AU", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    })
    .replaceAll(" ", "/");
});

function addExtraDriver(id) {
  savingChanges.value = true;
  let params = {
    method: "extradriver",
    reservationref: store.resref,
    customerid: id,
    customer: {
      ...data.value,
    },
  };
  if (!data.value.firstname || !data.value.lastname || !data.value.email) {
    alert("please fill all required fields");
    savingChanges.value = false;
    return;
  }
  rcm(params)
    .then((res) => {
      emit("update");
      data.value = props.customer;
      savingChanges.value = false;
    })
    .catch((err) => console.log(err));
}

function deleteExtraDriver(id) {
  savingChanges.value = true;
  let params = {
    method: "extradriver",
    reservationref: store.resref,
    customerid: id,
  };
  rcm(params)
    .then((res) => {
      emit("update");
    })
    .catch((err) => console.log(err));
}

function editBooking() {
  savingChanges.value = true;
  let ins = store.bookinginfo.extrafees.find(
    (el) => el.isinsurancefee == true
  ).extrafeeid;

  let params = {
    method: "editbooking",
    reservationref: store.resref,
    bookingtype: 2,
    insuranceid: ins,
    extrakmsid: store.bookinginfo.bookinginfo[0].kmcharges_id,
    numbertravelling: store.bookinginfo.bookinginfo[0].numbertravelling,
    customer: {
      ...data.value,
    },
  };
  rcm(params).then((res) => {
    emit("update");
    savingChanges.value = false;
  });
}
</script>

<style lang="postcss" scoped>
.my-input {
  padding: 0.35rem;
}
.my-label {
  @apply text-xs;
}
</style>
