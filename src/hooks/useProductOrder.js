import { useDispatch, useSelector } from "react-redux";
import {
  LoadOnePOforSupply,
  LoadOneProductOrder,
  StartCompleteProductOrder,
  StartLoadResumeSales,
  StartLoadVerifyQr,
  StartLoadVerifyToPoint,
  startLoadAssignRoute,
  startLoadAssignedPO,
  startLoadPOOutOfRegion,
  startLoadPOPaidAndSupply,
  startLoadPOPaidAndSupplyToPonit,
  startLoadPackageSent,
  startLoadPendingTransfer,
  startLoadPrintOrderPDF,
  startLoadProductOrders,
  startLoadProductOrdersPaid,
  startLoadProductOrdersPaidAndFill,
  startLoadReadyToDelivery,
  startLoadReadyToPoint,
  startLoadRoutesDelivery,
  startLoadVerifyPackage,
  startLoadVerifyStartRoute,
  startRejectTicket,
  startValidateSale,
} from "../store/actions/productOrderActions";
import { useNavigate } from "react-router-dom";

export const useProductOrder = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Selección de estados desde el store
  const { productOrders, productOrder, isLoading, resumeOrders, readyToPoint, readyToDelivery } = useSelector(
    (state) => state.allProductOrders
  );
  const { loading } = useSelector(
    (state) => state.ui
  );

  // Cargar todas las órdenes de productos
  const loadProductOrders = async () => dispatch(startLoadProductOrders());

  // Cargar órdenes de productos pagadas
  const loadProductOrdersPaid = async () =>
    dispatch(startLoadProductOrdersPaid());

  // Cargar órdenes de productos pagadas y completadas
  const loadProductOrdersPaidAndFill = async () =>
    dispatch(startLoadProductOrdersPaidAndFill());

  // Cargar órdenes pagadas y listas para ser enviadas a un punto
  const loadPOPaidAndSuplyToPoint = async () =>
    dispatch(startLoadPOPaidAndSupplyToPonit());

  // Cargar órdenes pagadas y listas para ser suministradas
  const loadPOPaidAndSuply = async () =>dispatch(startLoadPOPaidAndSupply())
  
  // Cargar órdenes asignadas
  const loadAssignedPO = async () =>
    dispatch(startLoadAssignedPO())

  // Asignar una ruta a una orden
  const loadAssignRoute = async (values, handleClose) =>
    dispatch(startLoadAssignRoute(values,handleClose, navigate));

  // Verificar el inicio de una ruta
  const loadVerifyStartRoute = async (values) =>
    dispatch(startLoadVerifyStartRoute(values, navigate));

  // Cargar una orden de producto específica por ID
  const loadProductOrder = async (id) => dispatch(LoadOneProductOrder(id));

  const loadPOforSupply = async (id) => dispatch(LoadOnePOforSupply(id));

  // Verificar un código QR
  const loadVerifyQR = async (values, callbackClose) => dispatch(StartLoadVerifyQr(values, callbackClose));

  // Verificar un código QR para un punto específico
  const loadVerifyQRtoPoint = async (values, callbackCloseModal) => dispatch(StartLoadVerifyToPoint(values, callbackCloseModal));

  // Cargar resumen de ventas
  const loadResumeProductOrder = async () => dispatch(StartLoadResumeSales());

  // Cargar paquetes enviados
  const loadPackagesSent = async () => dispatch(startLoadPackageSent())

  // Cargar órdenes listas para ser enviadas a un punto
  const loadReadyToPoint = async () => dispatch(startLoadReadyToPoint())

  // Cargar órdenes listas para ser entregadas
  const loadReadyToDelivery = async () => dispatch(startLoadReadyToDelivery())

  // Generar y cargar un PDF de una orden
  const loadPrintPDFOrder = async (id) => dispatch(startLoadPrintOrderPDF(id))

  // Verificar un paquete por ID
  const loadVerifyPackage = async (id) =>dispatch(startLoadVerifyPackage(id))

  // Cargar órdenes fuera de la región
  const loadPOOutOfRegions = async () =>dispatch(startLoadPOOutOfRegion())

  // Cargar rutas de entrega basadas en coordenadas
  const loadRoutesDelivery = async (myCoords) =>dispatch(startLoadRoutesDelivery(myCoords))

  // Validar una venta
  const validateSale = async (values) => dispatch(startValidateSale(values, navigate))

  // Rechazar un ticket
  const rejectTicket = async (values) => dispatch(startRejectTicket(values, navigate))

  // Cargar órdenes pendientes de transferencia
  const loadPendingTransferPO = async () => dispatch(startLoadPendingTransfer()) 

  // Completar una orden de producto
  const completeProductOrder = (id) =>
    dispatch(StartCompleteProductOrder(id, navigate));

  // Generar filas de productos de una orden específica
  const rowsProducts = () => {
    const products = productOrder?.products;
    return products?.map((product, index) => {
      return {
        ...product.item,
        id: index.toString(),
        quantity: product.quantity,
        subTotal: product.quantity * product.item.price,
        image : product?.item?.images[0]?.url ? product.item?.images[0].url : 'no hay imagen'
      };
    });
  };

  // Generar filas de órdenes con IDs y detalles adicionales
  const rowsWithIds = productOrders.map((item, index) => {
    const quantities = item.products.map((i) => i.quantity);
    const suma = quantities.reduce((valorAnterior, valorActual) => {
      return valorAnterior + valorActual;
    }, 0);

    const TD = item.branch ? "En Punto de entrega" : "A domicilio";
    return {
      quantityProduct: suma,
      typeDelivery: TD,
      id: index.toString(),
      ...item,
    };
  });

  // Retornar todas las funciones y estados necesarios
  return {
    dispatch,
    navigate,
    rowsProducts,
    loadProductOrdersPaid,
    loadPOPaidAndSuplyToPoint,
    loadPOPaidAndSuply,
    loadAssignRoute,
    loadResumeProductOrder,
    productOrder,
    productOrders,
    isLoading,
    loadProductOrders,
    loadProductOrder,
    resumeOrders,
    completeProductOrder,
    loadAssignedPO,
    loadVerifyStartRoute,
    loadPackagesSent,
    loadVerifyQR,
    loadVerifyQRtoPoint,
    loading,
    loadPrintPDFOrder,
    loadPendingTransferPO,
    rowsProducts,
    rowsWithIds,
    validateSale, 
    rejectTicket,
    loadVerifyPackage,
    loadReadyToPoint,
    readyToPoint,
    loadProductOrdersPaidAndFill,
    loadReadyToDelivery,
    readyToDelivery,
    loadRoutesDelivery,
    loadPOforSupply
  };
};
