import { v4 as uuidv4 } from 'uuid';
import { momoConfig, MOMO_ENDPOINTS, TRANSACTION_STATUS, type TransactionStatus, type Currency, type PartyIdType } from '../config/momo';

export interface MoMoParty {
  partyIdType: PartyIdType;
  partyId: string;
}

export interface MoMoTransaction {
  amount: string;
  currency: Currency;
  externalId: string;
  payer?: MoMoParty;
  payee?: MoMoParty;
  payerMessage?: string;
  payeeNote?: string;
}

export interface MoMoTransactionStatus {
  amount: string;
  currency: Currency;
  externalId: string;
  payer?: MoMoParty;
  payee?: MoMoParty;
  status: TransactionStatus;
  reason?: string;
  financialTransactionId?: string;
}

export interface MoMoAccountBalance {
  availableBalance: string;
  currency: Currency;
}

export interface MoMoAccessToken {
  access_token: string;
  token_type: string;
  expires_in: number;
}

export class MoMoService {
  private collectionsToken: string | null = null;
  private disbursementsToken: string | null = null;
  private collectionsTokenExpiry: number = 0;
  private disbursementsTokenExpiry: number = 0;

  constructor() {
    this.validateConfig();
  }

  private validateConfig(): void {
    if (!momoConfig.collections.subscriptionKey || !momoConfig.collections.userId || !momoConfig.collections.apiKey) {
      throw new Error('MoMo Collections configuration is incomplete');
    }
    if (!momoConfig.disbursements.subscriptionKey || !momoConfig.disbursements.userId || !momoConfig.disbursements.apiKey) {
      throw new Error('MoMo Disbursements configuration is incomplete');
    }
  }

  private async makeRequest(
    endpoint: string,
    method: 'GET' | 'POST' | 'PUT' = 'GET',
    body?: any,
    headers: Record<string, string> = {},
    useCollections: boolean = true
  ): Promise<any> {
    const config = useCollections ? momoConfig.collections : momoConfig.disbursements;
    const url = `${momoConfig.baseUrl}${endpoint}`;

    const defaultHeaders = {
      'Content-Type': 'application/json',
      'Ocp-Apim-Subscription-Key': config.subscriptionKey,
      'X-Target-Environment': process.env.NODE_ENV === 'production' ? 'live' : 'sandbox',
      ...headers,
    };

    try {
      const response = await fetch(url, {
        method,
        headers: defaultHeaders,
        body: body ? JSON.stringify(body) : undefined,
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`MoMo API Error: ${response.status} - ${errorText}`);
      }

      // Some endpoints return empty responses
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        return await response.json();
      }

      return null;
    } catch (error) {
      console.error('MoMo API Request failed:', error);
      throw error;
    }
  }

  // Authentication methods
  private async getCollectionsToken(): Promise<string> {
    if (this.collectionsToken && Date.now() < this.collectionsTokenExpiry) {
      return this.collectionsToken;
    }

    const credentials = Buffer.from(`${momoConfig.collections.userId}:${momoConfig.collections.apiKey}`).toString('base64');
    
    const tokenResponse: MoMoAccessToken = await this.makeRequest(
      MOMO_ENDPOINTS.collections.createAccessToken,
      'POST',
      null,
      {
        'Authorization': `Basic ${credentials}`,
      }
    );

    this.collectionsToken = tokenResponse.access_token;
    this.collectionsTokenExpiry = Date.now() + (tokenResponse.expires_in * 1000) - 60000; // Refresh 1 minute early

    return this.collectionsToken;
  }

  private async getDisbursementsToken(): Promise<string> {
    if (this.disbursementsToken && Date.now() < this.disbursementsTokenExpiry) {
      return this.disbursementsToken;
    }

    const credentials = Buffer.from(`${momoConfig.disbursements.userId}:${momoConfig.disbursements.apiKey}`).toString('base64');
    
    const tokenResponse: MoMoAccessToken = await this.makeRequest(
      MOMO_ENDPOINTS.disbursements.createAccessToken,
      'POST',
      null,
      {
        'Authorization': `Basic ${credentials}`,
      },
      false
    );

    this.disbursementsToken = tokenResponse.access_token;
    this.disbursementsTokenExpiry = Date.now() + (tokenResponse.expires_in * 1000) - 60000; // Refresh 1 minute early

    return this.disbursementsToken;
  }

  // Collections API methods
  async requestToPay(transaction: MoMoTransaction): Promise<string> {
    const token = await this.getCollectionsToken();
    const referenceId = uuidv4();

    await this.makeRequest(
      MOMO_ENDPOINTS.collections.requestToPay,
      'POST',
      transaction,
      {
        'Authorization': `Bearer ${token}`,
        'X-Reference-Id': referenceId,
        'X-Callback-Url': `${momoConfig.sandbox.callbackHost}/api/momo/collections/callback`,
      }
    );

    return referenceId;
  }

  async getCollectionTransactionStatus(referenceId: string): Promise<MoMoTransactionStatus> {
    const token = await this.getCollectionsToken();
    
    return await this.makeRequest(
      MOMO_ENDPOINTS.collections.getTransactionStatus.replace('{referenceId}', referenceId),
      'GET',
      null,
      {
        'Authorization': `Bearer ${token}`,
      }
    );
  }

  async getCollectionsBalance(): Promise<MoMoAccountBalance> {
    const token = await this.getCollectionsToken();
    
    return await this.makeRequest(
      MOMO_ENDPOINTS.collections.getAccountBalance,
      'GET',
      null,
      {
        'Authorization': `Bearer ${token}`,
      }
    );
  }

  // Disbursements API methods
  async transfer(transaction: MoMoTransaction): Promise<string> {
    const token = await this.getDisbursementsToken();
    const referenceId = uuidv4();

    await this.makeRequest(
      MOMO_ENDPOINTS.disbursements.transfer,
      'POST',
      transaction,
      {
        'Authorization': `Bearer ${token}`,
        'X-Reference-Id': referenceId,
        'X-Callback-Url': `${momoConfig.sandbox.callbackHost}/api/momo/disbursements/callback`,
      },
      false
    );

    return referenceId;
  }

  async getDisbursementTransactionStatus(referenceId: string): Promise<MoMoTransactionStatus> {
    const token = await this.getDisbursementsToken();
    
    return await this.makeRequest(
      MOMO_ENDPOINTS.disbursements.getTransactionStatus.replace('{referenceId}', referenceId),
      'GET',
      null,
      {
        'Authorization': `Bearer ${token}`,
      },
      false
    );
  }

  async getDisbursementsBalance(): Promise<MoMoAccountBalance> {
    const token = await this.getDisbursementsToken();
    
    return await this.makeRequest(
      MOMO_ENDPOINTS.disbursements.getAccountBalance,
      'GET',
      null,
      {
        'Authorization': `Bearer ${token}`,
      },
      false
    );
  }

  // Utility methods
  async validateAccountHolder(msisdn: string, useCollections: boolean = true): Promise<boolean> {
    try {
      const token = useCollections ? await this.getCollectionsToken() : await this.getDisbursementsToken();
      const endpoint = useCollections 
        ? MOMO_ENDPOINTS.collections.validateAccountHolder 
        : MOMO_ENDPOINTS.disbursements.validateAccountHolder;

      await this.makeRequest(
        endpoint.replace('{accountHolderMSISDN}', msisdn),
        'GET',
        null,
        {
          'Authorization': `Bearer ${token}`,
        },
        useCollections
      );

      return true;
    } catch (error) {
      return false;
    }
  }

  // Helper method to create a standardized transaction object
  createTransaction(
    amount: string,
    currency: Currency,
    externalId: string,
    partyId: string,
    partyIdType: PartyIdType = 'msisdn',
    message?: string
  ): MoMoTransaction {
    return {
      amount,
      currency,
      externalId,
      payer: {
        partyIdType,
        partyId,
      },
      payerMessage: message,
      payeeNote: message,
    };
  }
}

export const momoService = new MoMoService();
