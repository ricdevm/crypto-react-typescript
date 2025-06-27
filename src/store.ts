import { create } from "zustand";
import { devtools } from "zustand/middleware";
import type { CryptoCurrency, CryptoPrice, Pair } from "./types";
import { getCryptos, fetchCurrentCryptoPrice } from "./services/CryptoService";

type CryptoStore = {
    cryptocurrencies: CryptoCurrency[]
    result: CryptoPrice 
    loading: boolean
    fetchCryptos: () => Promise<void>
    fetchData: (pair: Pair) => Promise<void>
}

export const useCryptoStore = create<CryptoStore>()(devtools((set, get) => ({
    cryptocurrencies: [],
    result: {} as CryptoPrice,
    loading: false,
    fetchCryptos: async () => {
        const cryptocurrencies = await getCryptos()
        set(() => ({
            cryptocurrencies
        }))
    },
    fetchData: async (pair) => {
        set(() => ({
            loading: true
        }))
        const price = await fetchCurrentCryptoPrice(pair)
        const symbol = pair.criptocurrency.toUpperCase()
        const logo = get().cryptocurrencies.find(c => c.SYMBOL === symbol)?.LOGO_URL
        set(() => ({
            result: price ? { ...price, logo } : { VALUE: 0, CURRENT_DAY_HIGH: 0, CURRENT_DAY_LOW: 0, CURRENT_HOUR_CHANGE: 0, MOVING_24_HOUR_CHANGE: 0, logo },
            loading: false 
        }))  
    }
})))