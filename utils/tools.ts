export const convertMoney = (value: number) => {
  return Intl.NumberFormat("en", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(value);
};
