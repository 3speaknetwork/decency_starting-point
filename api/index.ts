import numeral from "numeral";
import {
  Client,
  PrivateKey,
  cryptoUtils,
  AccountCreateOperation,
  Authority,
} from "@hiveio/dhive";
import { SERVERS } from "constants/constants";
import { Community } from "./types";
import { parseAsset } from "./parseAssets";
import base58 from "bs58";

const handleBroadcastRequest = async (
  operations: any,
  username: string,
  post: string = "active"
) => {
  return new Promise((res, rej) => {
    // @ts-ignore
    if (window.hive_keychain) {
      // @ts-ignore
      window.hive_keychain.requestBroadcast(
        username,
        [operations],
        post,
        (response: any) => {
          res(response);
        }
      );
    } else {
      rej("Didn't return response");
    }
  });
};

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

interface CreateCommunityPayload {
  username: string;
  communityName: string;
  aboutCommunity: string;
  fee: string;
  wif: string;
  communityHiveID: string;
}

const genUsername = (): string => {
  return `hive-${Math.floor(Math.random() * 100000) + 100000}`;
};

const genWif = (): string =>
  "P" +
  base58.encode(cryptoUtils.sha256(Math.random().toString(36).substring(7)));

const makePrivateKeys = (communityName: string, wif: string) => {
  return {
    ownerKey: PrivateKey.fromLogin(communityName, wif, "owner"),
    activeKey: PrivateKey.fromLogin(communityName, wif, "active"),
    postingKey: PrivateKey.fromLogin(communityName, wif, "posting"),
    memoKey: PrivateKey.fromLogin(communityName, wif, "memo"),
  };
};

export const getCommunityCreationInfo = async () => {
  const communityHiveID = genUsername();
  const wif = genWif();
  const r = await hiveClient.database.getChainProperties();
  const asset = parseAsset(r.account_creation_fee.toString());
  const fee = `${numeral(asset.amount).format("0.000")} ${asset.symbol}`;

  return {
    username: communityHiveID,
    fee,
    wif,
  };
};

export const createCommunity = async ({
  username,
  communityName,
  fee,
  communityHiveID,
  wif,
}: CreateCommunityPayload) => {
  if (fee) {
    const keys = makePrivateKeys(communityHiveID, wif);
    const operations = [
      "account_create",
      {
        fee,
        creator: username,
        new_account_name: communityHiveID,
        owner: {
          weight_threshold: 1,
          account_auths: [],
          key_auths: [[keys.ownerKey.createPublic().toString(), 1]],
        },
        active: {
          weight_threshold: 1,
          account_auths: [],
          key_auths: [[keys.activeKey.createPublic().toString(), 1]],
        },
        posting: {
          weight_threshold: 1,
          account_auths: [["ecency.app", 1]],
          key_auths: [[keys.postingKey.createPublic().toString(), 1]],
        },
        memo_key: keys.memoKey.createPublic().toString(),
        json_metadata: "",
      },
    ];

    return await handleBroadcastRequest(operations, username);
  }
};
