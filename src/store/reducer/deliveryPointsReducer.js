import { createSlice } from '@reduxjs/toolkit'

export const deliveryPointsReducer = createSlice({
  name: 'deliveryPoints',
  initialState: {
    deliveryPoints: [],
    deliveryPoint: {},
    orders: [],
    loading: false
  },
  reducers: {
    // Carga todos los puntos de entrega en el estado
    loadDeliveryPoints: (state, action) => {
      state.deliveryPoints = action.payload;
    },
    // Carga un punto de entrega específico en el estado
    loadDeliveryPoint: (state, { payload }) => {
      state.deliveryPoint = payload;
    },
    // Agrega un nuevo punto de entrega al estado
    onAddNewDeliveryPoint: (state, { payload }) => {
      state.deliveryPoint = payload;
    },
    // Elimina un punto de entrega del estado por su ID
    deleteDeliveryPoint: (state, { payload }) => {
      state.deliveryPoints = state.deliveryPoints.filter(branch => branch._id !== _id);
    },
    // Edita un punto de entrega específico en el estado
    editDeliveryPoint: ( state, { payload } ) => {
      state.deliveryPoints = state.deliveryPoints.map(branch => {
        if (branch._id === payload._id) {
          return {
            ...branch,
            name: payload.name,
          };
        }
        return branch; // Mantener los elementos no modificados tal como están
      });
    },  
    // Activa o desactiva un punto de entrega
    toggleBranch : (state, { payload }) => {
      state.deliveryPoints = state.deliveryPoints.map((branch) => {
        if(branch._id === payload._id){
          return { 
            ...branch,
            activated: payload.activated
          }
        }
        return branch;
      })
    },
    // Establece el estado de carga (loading)
    setLoading: (state, { payload }) => {
      state.loading = payload
    }, 
    // Reinicia el punto de entrega actual
    resetDeliveryPoint: (state) => {
      state.deliveryPoint = {}
    },
    // Establece las órdenes asociadas a un punto de entrega
    setOrdersByDeliveryPoint: (state, {payload}) => {
      state.orders = payload
    },
    // Actualiza una orden específica en el estado
    onUpdateOrders: (state, {payload}) => {
      state.orders = state.orders.map((i)=>{
        if (i._id === payload._id) {
          return{
            ...payload
          }
        }
        return i
      })
    },
    // Elimina una orden específica del estado
    onDeleteOrder: (state, {payload}) => {
      state.orders = state.orders.filter((i)=>i._id !== payload._id)
    },
    // Elimina una imagen específica de un punto de entrega
    deleteDeliveryPointImage: (state, {payload}) => {
      state.deliveryPoint.images = state.deliveryPoint.images.filter(image=> image._id !== payload)
    }
  }
  })

export const { loadDeliveryPoints, loadDeliveryPoint, onAddNewDeliveryPoint, deleteDeliveryPoint, editDeliveryPoint, resetDeliveryPoint, setLoading, toggleBranch, setOrdersByDeliveryPoint, deleteDeliveryPointImage, onUpdateOrders, onDeleteOrder } = deliveryPointsReducer.actions;

export default deliveryPointsReducer.reducer;