import { ColorType } from "components/sections/customize/colorScheme";
import { ImageListType } from "react-images-uploading";
import { atom } from "recoil";

export const userState = atom({
  key: "user_state",
  default: null,
});

export const stepState = atom<number>({
  key: "step_state",
  default: 0,
});

export const logoState = atom<string[]>({
  key: "logo_state",
  default: [],
});

export const colorState = atom<{
  primary: string;
  secondary: string;
  accents: string;
}>({
  key: "colors_state",
  default: {
    [ColorType.Primary]: "",
    [ColorType.Accents]: "",
    [ColorType.Secondary]: "",
  },
});
