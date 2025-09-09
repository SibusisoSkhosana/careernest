export interface MoMoConfig {
  baseUrl: string;
  collections: {
    subscriptionKey: string;
    userId: string;
    apiKey: string;
  };
  disbursements: {
    subscriptionKey: string;
    userId: string;
    apiKey: string;
  };
  sandbox: {
    baseUrl: string;
    callbackHost: string;
  };
}

export const momoConfig: MoMoConfig = {
  baseUrl: process.env.MOMO_BASE_URL || "https://sandbox.momodeveloper.mtn.com",
  collections: {
    subscriptionKey: process.env.MOMO_COLLECTIONS_SUBSCRIPTION_KEY || "b09bff7ce0c54f9fafe3bd78bb74279d",
    userId: process.env.MOMO_COLLECTIONS_USER_ID || "",
    apiKey: process.env.MOMO_COLLECTIONS_API_KEY || "",
  },
  disbursements: {
    subscriptionKey: process.env.MOMO_DISBURSEMENTS_SUBSCRIPTION_KEY || "22dd0dec976649989455bf871abb24b0",
    userId: process.env.MOMO_DISBURSEMENTS_USER_ID || "",
    apiKey: process.env.MOMO_DISBURSEMENTS_API_KEY || "",
  },
  sandbox: {
    baseUrl: process.env.MOMO_SANDBOX_BASE_URL || "https://sandbox.momodeveloper.mtn.com",
    callbackHost: process.env.MOMO_CALLBACK_HOST || "https://your-app.com",
  },
};

// MoMo API endpoints
export const MOMO_ENDPOINTS = {
  // Collections API
  collections: {
    createUser: "/v1_0/apiuser",
    createApiKey: "/v1_0/apiuser/{userId}/apikey",
    createAccessToken: "/collection/token/",
    requestToPay: "/collection/v1_0/requesttopay",
    getTransactionStatus: "/collection/v1_0/requesttopay/{referenceId}",
    getAccountBalance: "/collection/v1_0/account/balance",
    validateAccountHolder: "/collection/v1_0/accountholder/msisdn/{accountHolderMSISDN}/active",
  },
  // Disbursements API
  disbursements: {
    createUser: "/v1_0/apiuser",
    createApiKey: "/v1_0/apiuser/{userId}/apikey",
    createAccessToken: "/disbursement/token/",
    transfer: "/disbursement/v1_0/transfer",
    getTransactionStatus: "/disbursement/v1_0/transfer/{referenceId}",
    getAccountBalance: "/disbursement/v1_0/account/balance",
    validateAccountHolder: "/disbursement/v1_0/accountholder/msisdn/{accountHolderMSISDN}/active",
  },
  // Sandbox API
  sandbox: {
    createUser: "/v1_0/apiuser",
    createApiKey: "/v1_0/apiuser/{userId}/apikey",
  },
};

// Transaction statuses
export const TRANSACTION_STATUS = {
  PENDING: "PENDING",
  SUCCESSFUL: "SUCCESSFUL",
  FAILED: "FAILED",
  CANCELLED: "CANCELLED",
} as const;

// Currency codes
export const CURRENCY = {
  ZAR: "ZAR",
  EUR: "EUR",
  USD: "USD",
} as const;

// Party ID types
export const PARTY_ID_TYPE = {
  MSISDN: "msisdn",
  EMAIL: "email",
  PARTY_CODE: "party_code",
} as const;

export type TransactionStatus = typeof TRANSACTION_STATUS[keyof typeof TRANSACTION_STATUS];
export type Currency = typeof CURRENCY[keyof typeof CURRENCY];
export type PartyIdType = typeof PARTY_ID_TYPE[keyof typeof PARTY_ID_TYPE];
