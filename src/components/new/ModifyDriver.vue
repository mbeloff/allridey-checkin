<template>
  <div class="relative gap-y-5 rounded border bg-white p-2 text-left">
    <loading-overlay v-if="savingChanges"></loading-overlay>
    <p class="my-3 text-xl font-bold">Driver Details</p>
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

      <div class="mt-auto grid h-8 grid-cols-2 gap-3">
        <button
          v-if="!newDriver && !isPrimary"
          class="btn-red"
          @click="deleteExtraDriver(-data.customerid)"
        >
          Delete Driver <i class="fas fa-trash-can-xmark"></i>
        </button>
        <button
          v-if="!isPrimary"
          class="btn-green col-start-2"
          @click="addExtraDriver(data.customerid)"
        >
          {{ !newDriver ? "Update" : "Add" }}
          <i class="far fa-cloud-upload"></i>
        </button>
        <button
          v-if="isPrimary"
          class="btn-green col-start-2"
          @click="editBooking()"
        >
          Update <i class="far fa-cloud-upload"></i>
        </button>
      </div>
    </div>
    <!-- 
    <div class="my-10" v-if="!newDriver">
      <p class="my-3 text-xl font-bold">Document Uploads</p>
      <modify-uploads
        @update-section-status="uploadMissing = $event"
        :cid="customer.customerid"
      ></modify-uploads>
    </div>

    <div class="" v-if="!newDriver">
      <p class="my-3 text-xl font-bold">E-signature</p>
      <p class="text-sm italic text-gray-600">
        Please read and sign each required section using your mouse or
        touch-screen. Click save when you are finished.
      </p>
      <signature-section
        @update-section-status="signatureMissing = $event"
        :cid="customer.customerid"
      ></signature-section>
    </div> -->
  </div>
  <div class="relative gap-y-5 rounded border bg-white p-2 text-left">
    <loading-overlay v-if="savingChanges"></loading-overlay>
    <modify-uploads :cid="data.customerid"></modify-uploads>
  </div>
</template>

<script setup>
import LoadingOverlay from "@/components/LoadingOverlay.vue";
import ModifyUploads from "@/components/new/ModifyUploads.vue";
import "v-calendar/dist/style.css";
import { ref, computed, inject, watch, onMounted, toRefs } from "vue";
import { useStore } from "@/store";

const rcm = inject("rcm");
const store = useStore();
const cid = computed(() => customer.value.customerid);
const countries = computed(() => store.countries);
const savingChanges = ref(false);
const data = ref({});
const dateofbirth = ref(new Date());
const licenseexpires = ref(new Date());

const emit = defineEmits(["update"]);

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
        dateofbirth: "",
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

const { newDriver, isPrimary, customer } = toRefs(props);

const months = [
  ["Jan", "01"],
  ["Feb", "02"],
  ["Mar", "03"],
  ["Apr", "04"],
  ["May", "05"],
  ["Jun", "06"],
  ["Jul", "07"],
  ["Aug", "08"],
  ["Sep", "09"],
  ["Oct", "10"],
  ["Nov", "11"],
  ["Dec", "12"],
];

onMounted(() => {
  data.value = JSON.parse(JSON.stringify(customer.value));

  if (newDriver.value == false) {
    if (customer.value.dateofbirth) {
      let dob = replaceMonth(customer.value.dateofbirth);
      dob = dob.split(" ");
      dob = new Date(dob[2], dob[1] - 1, dob[0]);
      dateofbirth.value = dob;
    } else {
      dateofbirth.value = new Date(2000, 0, 1);
    }
    if (customer.value.licenseexpires) {
      let exp = replaceMonth(customer.value.licenseexpires);
      exp = exp.split(" ");
      exp = new Date(exp[2], exp[1] - 1, exp[0]);
      licenseexpires.value = exp;
    } else {
      licenseexpires.value = new Date();
    }
  } else {
    dateofbirth.value = new Date(2000, 0, 1);
    licenseexpires.value = new Date();
  }
});

watch(dateofbirth, () => {
  data.value.dateofbirth = dateofbirth.value.toLocaleDateString("en-AU");
});
watch(licenseexpires, () => {
  data.value.licenseexpires = licenseexpires.value.toLocaleDateString("en-AU");
});

function replaceMonth(str) {
  let newStr = str.replaceAll("/", " ");
  months.forEach((el) => {
    newStr = newStr.replaceAll(el[0], el[1]);
  });
  return newStr;
}

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
      data.value = customer.value;
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
  console.log(params);
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
