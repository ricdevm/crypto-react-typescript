import axios from "axios";
import { CryptoCurrenciesResponseSchema, CryptoPriceSchema } from "../schema/crypto-schema";
import type { Pair } from "../types";

export async function getCryptos() {
    const url = "https://data-api.coindesk.com/asset/v1/top/list?page=1&page_size=20&sort_by=CIRCULATING_MKT_CAP_USD&sort_direction=DESC&toplist_quote_asset=USD"
    const {data} = await axios(url)
    const result = CryptoCurrenciesResponseSchema.safeParse(data)
    if(result.success) {
        return result.data.Data.LIST
    }
}

export async function fetchCurrentCryptoPrice(pair: Pair) {
    const url = `https://data-api.coindesk.com/index/cc/v1/latest/tick?market=cadli&instruments=${pair.criptocurrency}-${pair.currency}&apply_mapping=true`
    const {data: {Data}} = await axios(url)
    const key = `${pair.criptocurrency}-${pair.currency}`.toUpperCase()
    const cryptoData = Data[key]
    const result = CryptoPriceSchema.safeParse(cryptoData)
    if(result.success){
        return result.data
    }
}