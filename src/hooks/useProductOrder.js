import { useDispatch, useSelector } from "react-redux";
import {
  LoadOneProductOrder,
  StartCompleteProductOrder,
  StartLoadResumeSales,
  StartLoadVerifyQr,
  StartLoadVerifyToPoint,
  startLoadAssignRoute,
  startLoadAssignedPO,
  startLoadPOPaidAndSupply,
  startLoadPOPaidAndSupplyToPonit,
  startLoadPackageSent,
  startLoadProductOrders,
  startLoadProductOrdersPaid,
  startLoadVerifyStartRoute,
} from "../store/actions/productOrderActions";
import { useNavigate } from "react-router-dom";

export const useProductOrder = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { productOrders, productOrder, isLoading, resumeOrders } = useSelector(
    (state) => state.allProductOrders
  );

  const loadProductOrders = async () => dispatch(startLoadProductOrders());

  const loadProductOrdersPaid = async () =>
    dispatch(startLoadProductOrdersPaid());

  const loadPOPaidAndSuplyToPoint = async () =>
    dispatch(startLoadPOPaidAndSupplyToPonit());

  const loadPOPaidAndSuply = async () =>dispatch(startLoadPOPaidAndSupply())
  
  const loadAssignedPO = async () =>
    dispatch(startLoadAssignedPO())


  const loadAssignRoute = async (values) =>
    dispatch(startLoadAssignRoute(values, navigate));

  const loadVerifyStartRoute = async (values) =>
    dispatch(startLoadVerifyStartRoute(values, navigate));

  const loadProductOrder = async (id) => dispatch(LoadOneProductOrder(id));

  const loadVerifyQR = async (values) => dispatch(StartLoadVerifyQr(values));

  const loadVerifyQRtoPoint = async (values) => dispatch(StartLoadVerifyToPoint(values));

  const loadResumeProductOrder = async () => dispatch(StartLoadResumeSales());

  const loadPackagesSent = async () => dispatch(startLoadPackageSent())

  const completeProductOrder = (id) =>
    dispatch(StartCompleteProductOrder(id, navigate));

  const rowsProducts = () => {
    const products = productOrder?.products;
    return products?.map((product, index) => {
      return {
        ...product.item,
        id: index.toString(),
        quantity: product.quantity,
      };
    });
  };

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
    loadVerifyQRtoPoint
  };
};
