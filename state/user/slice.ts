import { ImageListType } from "react-images-uploading";
import { atom } from "recoil";

export const userState = atom({
  key: "user_slice",
  default: null,
});

export const logoSlice = atom<string[]>({
  key: "logo_slice",
  default: [],
});

export const stepSlice = atom<number>({
  key: "step_slice",
  default: 0,
});
