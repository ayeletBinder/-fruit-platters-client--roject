import { configureStore } from '@reduxjs/toolkit'
import clientsReducer from './component/clients/clientSlice'
import commentsReducer from './component/comments/commentSlice'
import ordersReducer from './component/orders/orderSlice'
import fruitsReducer from './component/fruits/fruitSlice1'
import traysReducer from './component/trays/traySlice'
export const store = configureStore({
  reducer: {
    clients: clientsReducer,
    comments: commentsReducer,
    orders: ordersReducer,
    fruits: fruitsReducer,
    trays:traysReducer
  },
})