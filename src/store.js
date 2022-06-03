import { defineStore } from "pinia";

export const useStore = defineStore("store", {
  state: () => {
    return {
      token: "",
      tokenexpires: "",
      resref: "",
      mode: undefined,
      status: "",
      allocated: false,
      bookinginfo: {},
      countries: [],
      missing: {
        customers: {},
        vault: false,
      },
    };
  },
});
