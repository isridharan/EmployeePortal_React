export enum MessageType {
  success = 'success',
  error = 'error',
  warning = 'warning',
}

export const formatCurrency = (amount: number, currency: string) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: currency,
  }).format(amount);
