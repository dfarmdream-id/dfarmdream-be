// Tipe untuk JournalTemplateDetail
export interface JournalTemplateDetail {
  id: string;
  status: string;
  typeLedger: 'DEBIT' | 'CREDIT';
  coa: { code: string; name: string };
}

// Tipe untuk detail yang akan dibuat
export interface CreateJournalDetailDto {
  coaCode: string;
  debit: number;
  credit: number;
  note: string;
}

export type CostItem = {
  item: string;
  quantity: number;
  price: number;
  inputPerDay: number;
  dailyCostAmount: number;
};
