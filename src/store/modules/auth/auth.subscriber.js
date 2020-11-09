import store from "@/store";

store.subscribe((mutation) => {
  switch (mutation.type) {
    case "authModule/LOGIN_SUCCESS":
      window.sessionStorage.setItem("token", mutation.payload);
      break;
    case "authModule/CLEAR_AUTH":
      window.sessionStorage.removeItem("token");
      break;
    default:
      break;
  }
});
