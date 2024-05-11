export const currencyConverter = (
    amount: number | undefined,
    locale: string = "en-us",
    currency: string = "USD"
): string | undefined => {
  return amount?.toLocaleString(locale, {
    style: "currency",
    currency,
  });
};
