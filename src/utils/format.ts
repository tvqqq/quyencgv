export function formatVND(amount: number): string {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatCompactVND(amount: number): string {
  if (amount >= 1000 && amount % 1000 === 0) {
    return `${amount / 1000}k`;
  }
  return formatVND(amount);
}

export function parseFormattedNumber(val: string): number {
  const cleaned = val.replace(/[^0-9]/g, '');
  return cleaned ? parseInt(cleaned, 10) : 0;
}
