import { atom } from "recoil";

export const userState = atom({
  key: "user_slice",
  default: {
    logo: "",
    colorTheme: "",
    title: "",
  },
});
