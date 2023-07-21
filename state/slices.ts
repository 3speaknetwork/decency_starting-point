import { ColorSchemes } from "constants/constants";
import { atom } from "recoil";
import { CommunityInfo, ServerInfo } from "./types";

export const userState = atom<any>({
  key: "user_state",
  default: null,
});

export const communityCreationState = atom({
  key: "community_state",
  default: {
    title: "",
    about: "",
    fee: "",
    wif: "",
    communityHiveID: "",
  },
});

export const stepState = atom<number>({
  key: "step_state",
  default: 0,
});

export const communityInfoState = atom<CommunityInfo>({
  key: "info_state",
  default: {
    hive_id: "",
    tags: [],
  },
});

export const serverInfoState = atom<ServerInfo>({
  key: 'server_state',
  default: {
    password: '',
    ip: '',
    username: 'root',
  }
})