import { useEffect } from "react"
import { useProducts } from "../../hooks/useProducts"
import { useAuthStore } from "../../hooks"

const StockMovements = () => {
    const{ loadEntriesProducts, loadOutputsProducts } = useProducts()
    const {user} = useAuthStore()

    useEffect(() => {
     loadEntriesProducts()
     loadOutputsProducts
    }, [user])

    
  return (
    <div>StockMovements</div>
  )
}

export default StockMovements