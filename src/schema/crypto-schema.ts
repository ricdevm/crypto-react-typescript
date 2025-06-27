import { z } from "zod"

export const CurrencySchema = z.object({
    code: z.string(),
    name: z.string()
})

export const CryptoCurrencyResponseSchema = z.object({
  NAME: z.string(),
  SYMBOL: z.string(),
  LOGO_URL: z.string().url().optional()
});

export const CryptoCurrenciesResponseSchema = z.object({
  Data: z.object({
    LIST: z.array(CryptoCurrencyResponseSchema),
  }),
});

export const PairSchema = z.object({
  currency: z.string(),
  criptocurrency: z.string()
})

export const CryptoPriceSchema = z.object({
  VALUE: z.number(),
  CURRENT_DAY_HIGH: z.number(),
  CURRENT_DAY_LOW: z.number(),
  CURRENT_HOUR_CHANGE: z.number(),
  MOVING_24_HOUR_CHANGE: z.number(),
  logo: z.string().optional()
})