import { useMemo } from "react"
import { useCryptoStore } from "../store"
import { setCurrentCurrency, formatCurrency } from "../helpers"
import Spinner from "./Spinner"

export default function CryptoPriceDisplay() {
    const result = useCryptoStore((state) => state.result)
    const loading = useCryptoStore((state) => state.loading)
    const hasResult = useMemo(() => result.VALUE > 0, [result])

    setCurrentCurrency("CLP")

    return (
        <div className="result-wrapper">
            {loading ? <Spinner /> : hasResult && (
                <>
                    <h2>Cotización</h2>
                    <div className="result">
                        <img src={result.logo} alt="Imagen de Cryptomoneda" />
                        <div>
                            <p>El precio es de: <span>{formatCurrency(result.VALUE)}</span></p>
                            <p>Precio más alto del día: <span>{formatCurrency(result.CURRENT_DAY_HIGH)}</span></p>
                            <p>Precio más bajo del día: <span>{formatCurrency(result.CURRENT_DAY_LOW)}</span></p>
                            <p>Variación última hora: <span>{formatCurrency(result.CURRENT_HOUR_CHANGE)}</span></p>
                            <p>Variación últimas 24h: <span>{formatCurrency(result.MOVING_24_HOUR_CHANGE)}</span></p>
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}
