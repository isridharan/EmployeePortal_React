export enum MessageType {
  success = 'success',
  error = 'error',
  warning = 'warning',
}

export const checkForAlphabets = function (value) {
  return value.match('[a-zA-Z]');
};

export const formatCurrency = (amount: number, currency: string) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: currency,
  }).format(amount);
