import { Client } from "@hiveio/dhive";
import { SERVERS } from "constants/constants";
import { Community } from "./types";

const hiveClient = new Client(SERVERS, {
  timeout: 4000,
  failoverThreshold: 2,
  consoleOnFailover: true,
});

const bridgeApiCall = <T>(endpoint: string, params: {}): Promise<T> =>
  hiveClient.call("bridge", endpoint, params);

export const getCommunity = (
  name: string,
  observer: string | undefined = ""
): Promise<Community | null> =>
  bridgeApiCall<Community | null>("get_community", { name, observer });
