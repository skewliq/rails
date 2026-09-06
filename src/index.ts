/**
 * Public Skew rails client. POST /swap/build returns unsigned calldata.
 * Sign with your own key. Skew never holds keys.
 */

export const BASE_URL = "https://skewliq.com/api/v1";

export const CHAIN = {
  name: "Robinhood Chain",
  chainId: 4663,
  rpc: "https://rpc.mainnet.chain.robinhood.com",
  explorer: "https://robinhoodchain.blockscout.com",
} as const;

export const ADDRESSES = {
  router: "0xb6272786e3bEA0d092289Eb274197a8eee60881a",
  feePot: "0x80D563b335c143e1F9f92f84782c347566f57741",
  treasury: "0x28040f07e0857a13a5fD3741A4150B8CCFAdf00E",
  distributor: "0x74070D6b984baC6214d278fB9e8Aba5698a0E8e1",
  partnerRegistry: "0x03e84726940C5b1A5e71aCA908aDc26998Eb94e7",
  weth: "0x0Bd7D308f8E1639FAb988df18A8011f41EAcAD73",
  usdg: "0x5fc5360D0400a0Fd4f2af552ADD042D716F1d168",
} as const;

export const FEE_BPS = 30;

export type BuildSwapInput = {
  tokenIn: string;
  tokenOut: string;
  fee?: number;
  amountIn: string;
  amountOutMinimum?: string;
  recipient: string;
  path?: string;
  via?: "usdg";
};

export type BuiltSwap = {
  to: string;
  data: string;
  value: string;
  amountIn: string;
  amountOutMinimum: string;
  quotedIn: string;
  description: string;
};

export async function buildSwap(input: BuildSwapInput, baseUrl = BASE_URL): Promise<BuiltSwap> {
  const res = await fetch(`${baseUrl}/swap/build`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(input),
  });
  const body = (await res.json()) as BuiltSwap & { error?: string };
  if (!res.ok) {
    throw new Error(body.error ?? `swap/build ${res.status}`);
  }
  return body;
}

export async function getJson<T>(path: string, baseUrl = BASE_URL): Promise<T> {
  const res = await fetch(`${baseUrl}${path}`);
  if (!res.ok) {
    throw new Error(`${path} ${res.status}`);
  }
  return res.json() as Promise<T>;
}

export const reads = {
  epochs: () => getJson("/epochs"),
  epoch: (id: string) => getJson(`/epochs/${encodeURIComponent(id)}`),
  epochPayouts: (id: string) => getJson(`/epochs/${encodeURIComponent(id)}/payouts`),
  holderPayouts: (address: string) => getJson(`/holders/${encodeURIComponent(address)}/payouts`),
  board: () => getJson("/payouts/board"),
  standings: (query = "") => getJson(`/payouts/standings${query}`),
  partners: () => getJson("/partners"),
  partner: (id: string) => getJson(`/partners/${encodeURIComponent(id)}`),
  openapi: () => getJson("/openapi"),
};
