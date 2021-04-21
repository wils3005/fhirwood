const MILLISECONDS_PER_YEAR = 31557600000;

function calcAge(birthDate: string): number {
  const diff = Date.now() - Date.parse(birthDate);

  return Math.round(diff / MILLISECONDS_PER_YEAR);
}

export { calcAge };
