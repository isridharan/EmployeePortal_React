export enum MessageType {
  success = 'success',
  error = 'error',
  warning = 'warning',
}

const regexAlphabetOnly = /^[a-z]+$/i;
const regexNumberOnly = /^[0-9\b]+$/;

export const checkForAlphabets = function (value) {
  return regexAlphabetOnly.test(value);
};

export const checkForNumber = function (value) {
  return regexNumberOnly.test(value);
};

export const formatCurrency = (amount: number, currency: string) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: currency,
  }).format(amount);
