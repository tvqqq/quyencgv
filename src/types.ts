export interface ComboItem {
  id: 'combo1' | 'combo2';
  name: string;
  description: string;
  originalPrice: number;
  discountPrice: number;
  quantity: number;
}

export interface PaymentInfo {
  bankName: string;
  accountNumber: string;
  accountHolder: string;
  amount: number;
  transferNote: string;
}

export interface CalculationResult {
  rawTicketPrice: number;
  discountedTicketPrice: number;
  ticketSavings: number;
  combo1Quantity: number;
  combo1Total: number;
  combo2Quantity: number;
  combo2Total: number;
  totalCombosPrice: number;
  totalCombosOriginalPrice: number;
  comboSavings: number;
  grandTotal: number;
  totalSavings: number;
}
