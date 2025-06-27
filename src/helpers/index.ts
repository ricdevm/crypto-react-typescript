// helpers/index.ts

let currentCurrency = "USD"; // Valor por defecto

// Monedas sin decimales
const noDecimalCurrencies = ["CLP", "JPY", "KRW"];

// Mapas de locales recomendados por moneda
const currencyLocales: Record<string, string> = {
  USD: "en-US",       // Dólar estadounidense
  CLP: "es-CL",       // Peso chileno
  MXN: "es-MX",       // Peso mexicano
  EUR: "es-ES",       // Euro
  GBP: "en-GB",       // Libra esterlina
};

export function setCurrentCurrency(code: string) {
  currentCurrency = code.toUpperCase();
}

export function formatCurrency(amount: number) {
  const locale = currencyLocales[currentCurrency] || "en-US";
  const isNoDecimal = noDecimalCurrencies.includes(currentCurrency);

  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currentCurrency,
    minimumFractionDigits: isNoDecimal ? 0 : 2,
    maximumFractionDigits: isNoDecimal ? 0 : 6,
  }).format(amount);
}
