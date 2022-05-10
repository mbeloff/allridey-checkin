import { defineStore } from "pinia";

export const useStore = defineStore("store", {
  // other options...
  state: () => {
    return {
      token: "",
      tokenExp: "",
      resref: "",
      resType: undefined,
      bookinginfo: {},
      countries: [],
    };
  },
});
