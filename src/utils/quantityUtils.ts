export function parseQuantityAndUnit(value: string): { qty: number; unit: string } | null {
  // Exemples attendus: "500 gr", "2.5 kg"
  const regex = /^(\d+(?:[.,]\d+)?)\s*(\S.*)$/;
  const match = value.match(regex);
  if (match) {
    const num = parseFloat(match[1].replace(",", "."));
    const unit = match[2].trim();
    return { qty: num, unit };
  }
  return null;
}

export function formatQuantity(qty: number): string {
  return Number.isInteger(qty) ? qty.toString() : qty.toFixed(2);
}