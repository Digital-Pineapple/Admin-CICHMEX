import { useDispatch, useSelector } from "react-redux";
import {
  LoadOneProduct,
  addOneProduct,
  deleteOneProduct,
  editOneProduct,
  startAddMultipleEntries,
  startAddMultipleOutputs,
  startAddOneImage,
  startDeleteOneImage,
  startLoadAllInputs,
  startLoadAllOutputs,
  startLoadEntriesProduct,
  startLoadNonExistProduct,
  startLoadOutputsProduct,
  startLoadProducts,
  startLoadStockProducts,
  startUpdateThumbnail,
  updateProductVideos,
} from "../store/actions/productsActions";
import { useNavigate } from "react-router-dom";
import { cleanProductDetail, onStepNewProduct } from "../store/reducer/productsReducer";

export const useProducts = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { products, product, stockProducts, entries, outputs, dataProduct } = useSelector(
    (state) => state.products
  );
  const { loading } = useSelector((state) => state.ui);

  const loadProducts = async () => dispatch(startLoadProducts());

  const loadEntriesProducts = async () => dispatch(startLoadEntriesProduct());
  const loadOutputsProducts = async () => dispatch(startLoadOutputsProduct());
  const loadAllInputs  = async () =>dispatch(startLoadAllInputs())
  const loadAllOutputs  = async () =>dispatch(startLoadAllOutputs())
  const loadStockProducts = async () => dispatch(startLoadStockProducts());
  const loadNoStockProducts = async () => dispatch(startLoadNonExistProduct());
  const loadProduct = async (_id) => {
    dispatch(LoadOneProduct(_id));
  };

  const createProduct = async (values, images) => {
    dispatch(addOneProduct(values, images, navigate));
  };
  const addMultipleEntries = async(values)=>{
    dispatch(startAddMultipleEntries(values,navigate))
  }
  const addMultipleOutputs = async(values)=>{
    dispatch(startAddMultipleOutputs(values,navigate))
  }

  const editProduct = async (id, values) =>
    dispatch(editOneProduct(id, values,  navigate));
  const updateVideo = ( id , values ) =>  dispatch(updateProductVideos(id,values))
  const updateThumbnail = ( id , values ) =>  dispatch(startUpdateThumbnail(id,values))
  const addOneImage = ( id , file ) =>  dispatch(startAddOneImage(id,file))
  const deleteImageDetail = (id, image_id)=>dispatch(startDeleteOneImage(id,image_id))
  const deleteProduct = async (id) => dispatch(deleteOneProduct(id));

  const cleanProductD = () => dispatch(cleanProductDetail());

  const rowsStockProducts = stockProducts.map((item, _id) => ({
    id: _id.toString(),
    total : item.price * item.stock,
    ...item,
  }));

  const rowsOutOfStockProducts = products?.map((item, _id) => ({
    id: _id.toString(),
    ...item,
  }));

  const rowsProducts = products?.map((item, _id) => ({
    id: _id.toString(),
    Category: item?.category?.name,
    SubCategory: item?.subCategory?.name,
    ...item,
  }));
  const rowsAllInputs = entries?.map((item, index) => ({
    id: index,
    
    ...item,
  }));
  const rowsAllOutputs = outputs?.map((item, index) => ({
    id: index,
    ...item,
  }));

  const dataStep1 = (data) => {
    const body = {
      brand: "",
      category: "",
      subCategory: "",
      model: null, 
      gender: null  
    };
  
    body.category = data.category;
    body.subCategory = data.subCategory;

    data.fields.forEach((i) => {
      if (i.id === "brand") body.brand = i.textInput;
      if (i.id === "model") body.model = i.textInput || null;
      if (i.id === "gender") body.gender = i.textInput || null;
    });
    
  
    dispatch (onStepNewProduct({...body})) 
  };

  const dataStep2 = (data)=>{
    const condition = data.condition
    
  const values ={...dataProduct, condition}
 dispatch (onStepNewProduct(values))
  }
  

  

  return {
    loadProducts,
    rowsOutOfStockProducts,
    stockProducts,
    rowsProducts,
    loadNoStockProducts,
    loadProduct,
    createProduct,
    editProduct,
    deleteProduct,
    rowsStockProducts,
    product,
    products,
    navigate,
    cleanProductD,
    loadStockProducts,
    entries,
    loadEntriesProducts,
    rowsAllInputs,
    loadOutputsProducts,
    loadAllInputs,
    loadAllOutputs,
    rowsAllOutputs,
    addMultipleEntries,
    loading,
    rowsAllOutputs,
    addMultipleOutputs,
    updateVideo,
    updateThumbnail,
    addOneImage,
    deleteImageDetail,
    dataStep1,
    dataProduct,
    dataStep2
  };
};
