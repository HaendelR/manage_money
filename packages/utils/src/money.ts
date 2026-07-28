export function formatMoney(
  amount: number,
  currency = "EUR"
) {
  return new Intl.NumberFormat(
    "fr-FR",
    {
      style: "currency",
      currency
    }
  ).format(amount);
}