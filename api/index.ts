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
  auths: {
    owner: string;
    active: string;
    posting: string;
  };
}

const makePrivateKeys = (communityName: string) => {
  const wif = base58.encode(
    cryptoUtils.sha256(Math.random().toString(36).substring(7))
  );

  return {
    ownerKey: PrivateKey.fromLogin(communityName, wif, "owner"),
    activeKey: PrivateKey.fromLogin(communityName, wif, "active"),
    postingKey: PrivateKey.fromLogin(communityName, wif, "posting"),
    memoKey: PrivateKey.fromLogin(communityName, wif, "memo"),
  };
};

export const createCommunity = async ({
  username,
  communityName,
}: CreateCommunityPayload) => {
  let fee = "";

  hiveClient.database.getChainProperties().then((r) => {
    const asset = parseAsset(r.account_creation_fee.toString());
    fee = `${numeral(asset.amount).format("0.000")} ${asset.symbol}`;
  });

  if (fee) {
    const keys = makePrivateKeys(communityName);
    const operations = [
      "account_create",
      {
        fee,
        creator: username,
        new_account_name: communityName,
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
