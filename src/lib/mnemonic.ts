import wordlist from "./wordlist";
import * as bip39 from "bip39";
import eth, { hdkey } from "ethereumjs-wallet";

export interface Wallet {
  privateKey: string;
  address: string;
  path?: string;
  mnemonic?: string;
}

export const getRandomfromArray = (items: any[]) => {
  return items[Math.floor(Math.random() * items.length)];
};

export const generateMnemonic = (
  arr: string[] = [],
  len = 12
): string[] | string => {
  if (arr.length === len) return arr.join(" ");
  const word: string = getRandomfromArray(wordlist);
  if (arr.includes(word)) return generateMnemonic(arr, len);
  return generateMnemonic([...arr, word], len);
};

export const mnemonicToKeys = (mnemonic: string, path = "m/44'/60'/0'/0/0") => {
  const seed = bip39.mnemonicToSeedSync(mnemonic);
  const node = hdkey.fromMasterSeed(seed);
  const instance = node.derivePath(path).getWallet();
  const wallet: Wallet = {
    privateKey: instance.getPrivateKeyString().slice(2),
    address: instance.getAddressString(),
    path,
    mnemonic,
  };
  return wallet;
};

export const privateKeyToKeys = (privateKey: string) => {
  console.log(privateKey, Buffer.from(privateKey, "hex").length);
  const instance = eth.fromPrivateKey(Buffer.from(privateKey.slice(), "hex"));
  const wallet: Wallet = {
    privateKey: instance.getPrivateKeyString().slice(2),
    address: instance.getAddressString(),
    path: "",
    mnemonic: "",
  };
  return wallet;
};

const wal = mnemonicToKeys(
  "pelican excess cotton jacket know north lend virtual awful hair thing very"
);

console.log(privateKeyToKeys(wal.privateKey));
