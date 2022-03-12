import { ColorSchemes } from "constants/constants";
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

export const colorState = atom<"sky_blue" | "dusk_yellow" | "burning_red">({
  key: "colors_state",
  default: "sky_blue",
});

export const infoState = atom<{
  hive_id: string;
  tags: string[];
}>({
  key: "info_state",
  default: {
    hive_id: "",
    tags: [],
  },
});
