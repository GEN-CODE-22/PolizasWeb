export const convertMoney = (value: number) => {
  return Intl.NumberFormat("en", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(value);
};

export function getDateRangeStateValues(state: string | null) {
  if (!state) {
    return null;
  }
  return new Date(state);
}
