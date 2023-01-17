export default function formatNumber(text: string): string {
  const lastnumber = text.charAt(9);
  const firstNine = text.slice(0, 9);
  const cardnumber = `GHA-${firstNine}-${lastnumber}`;
  return cardnumber;
}
