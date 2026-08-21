const currencyFormatter = new Intl.NumberFormat("id-ID");

export function formatPrice(price: number) {
  return `Rp ${currencyFormatter.format(price)}`;
}
