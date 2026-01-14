//control value to float

export function c2Flt(value) {
  const num = parseFloat(value);
  return isNaN(num) ? 0 : parseFloat(num.toFixed(2));
}
