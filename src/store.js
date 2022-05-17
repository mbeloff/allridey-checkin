import { defineStore } from "pinia";

export const useStore = defineStore("store", {
  // other options...
  state: () => {
    return {
      token: "",
      tokenExp: "",
      resref: "",
      mode: undefined,
      bookinginfo: {},
      countries: [],
      missing: {
        customers: {},
        vault: false,
      },
    };
  },
});
