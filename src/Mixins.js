import store from "./store.js";
export default {
  methods: {
    getToken() {
      var requestOptions = {
        method: "POST",
        redirect: "follow",
      };
      fetch("/.netlify/functions/getToken", requestOptions)
        .then((response) => response.text())
        .then((result) => {
          const res = JSON.parse(result);
          store.dispatch("token", res.access_token);
          store.dispatch("tokenExp", res[".expires"]);
        })
        .catch((error) => console.log("error", error));
    },

    async rcm(method) {
      let token = store.state.token;
      let tokenexpired = new Date(store.state.tokenExp).getTime() < new Date().getTime();
      if (tokenexpired) {
        console.log("refreshing token");
        this.getToken();
      }
      var requestOptions = {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(method),
      };
      return await fetch(
        "https://api.rentalcarmanager.com/v32/api",
        requestOptions
      )
        .then((response) => response.text())
        .then((result) => {
          return JSON.parse(result);
        });
    },
  },
};
