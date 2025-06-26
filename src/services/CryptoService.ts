import axios from "axios";
import { CryptoCurrenciesResponseSchema } from "../schema/crypto-schema";

export async function getCryptos() {
    const url = "https://data-api.coindesk.com/asset/v1/top/list?page=1&page_size=20&sort_by=CIRCULATING_MKT_CAP_USD&sort_direction=DESC&toplist_quote_asset=USD"
    const {data} = await axios(url)
    const result = CryptoCurrenciesResponseSchema.safeParse(data)
    if(result.success) {
        return result.data.Data.LIST
    }
}