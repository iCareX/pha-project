import { atom } from "recoil";

const userInfoState = atom({
  key: "user-info",
  default: JSON.parse(localStorage.getItem("userinfo")) || {},
});

export { userInfoState };
