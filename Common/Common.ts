export enum MessageType {
  success = 'success',
  error = 'error',
  warning = 'warning',
}

export const checkForAlphabets = function (value) {
  return /^[a-z]+$/i.test(value);
};

export const formatCurrency = (amount: number, currency: string) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: currency,
  }).format(amount);
