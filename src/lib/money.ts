/** NGN amounts cross application boundaries as integer kobo. */
export function formatNaira(kobo: number): string {
  if (!Number.isSafeInteger(kobo) || kobo < 0) throw new RangeError("Money must be non-negative integer kobo");
  return new Intl.NumberFormat("en-NG", { style: "currency", currency: "NGN", maximumFractionDigits: 0 }).format(kobo / 100);
}
