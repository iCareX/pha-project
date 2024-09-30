import { atom } from "recoil";

const userTokenState = atom({
  key: "user-token",
  default: localStorage.getItem("authToken") || "",
});

export { userTokenState };
