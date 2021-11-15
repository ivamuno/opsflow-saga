import { Injectable } from "@nestjs/common";

@Injectable()
export class AppService {
  private repo: Merchant[] = [];

  getAceHubConfig(): string {
    const response: Merchant[] = this.repo;
    return JSON.stringify(response);
  }

  setupAceHubMerchant(merchants: Merchant[]): void {
    merchants.forEach(m => {
      const index: number = this.repo.findIndex(i => i.businessId === m.businessId);
      if (index === -1) {
        this.repo.push(m);
        return;
      }

      this.repo[index] = m;
    });
  }
}

export class Merchant {
  businessId: string;
  name: string;
  status: string;
  init: MerchantState;
  cards: MerchantState;
  payon: MerchantState;
  acehub: MerchantState;
  finish: MerchantState;
}

export class MerchantState {
  command: string;
  compensation?: string;
}
