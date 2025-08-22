export function isValidNumber(value) {
  if (!value || value.trim() === "") return false;
  const num = Number(value);
  return Number.isFinite(num);
}

export function extractNumber(str) {
  const cleaned = str.replace(/[^0-9.-]/g, '');
  const number = parseFloat(cleaned);
  return isNaN(number) ? null : number;
}