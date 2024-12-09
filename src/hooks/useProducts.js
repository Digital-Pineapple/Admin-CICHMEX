import { useDispatch, useSelector } from "react-redux";
import {
  LoadOneProduct,
  StartUpdateMainFeatures,
  addOneProduct,
  // addProductAndVariants,
  deleteOneProduct,
  editOneProduct,
  finishCreateProduct,
  selectSizeGuide,
  sizeGuideEdit,
  startAddMultipleEntries,
  startAddMultipleOutputs,
  startAddOneImage,
  startAddProductWithVariants,
  startAddVariantsProduct,
  startDelete,
  startDeleteImageVariant,
  startDeleteOneImage,
  startLoadAllInputs,
  startLoadAllOutputs,
  startLoadEntriesProduct,
  startLoadNonExistProduct,
  startLoadOutputsProduct,
  startLoadProducts,
  startLoadStockProducts,
  startUpdateDescription,
  startUpdateThumbnail,
  startUpdateVariants,
  updateConditionStep,
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

  const deleteVariant = ( id ) => dispatch(startDelete(id))

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

  const dataStep1 = (data, handleNext) => {
    const body = {
      brand: "",
      category: "",
      subCategory: "",
      model: null, 
      gender: null,  
      name:""
    };
  
    body.category = data.category;
    body.subCategory = data.subCategory;

    data.fields.forEach((i) => {
      if (i.id === "brand") body.brand = i.textInput;
      if (i.id === "model") body.model = i.textInput || null;
      if (i.id === "gender") body.gender = i.textInput || null;
      if (i.id === "name") body.name = i.textInput || null;
    });
dispatch(startAddProductWithVariants(body, handleNext))

  };

  const dataStep2 = (id,data, handleNext)=>{
    const condition = data.condition
    dispatch(updateConditionStep(id,condition,handleNext))

  }

  const dataStep3 = (id, data, handleNext)=>{
    const size_guide = data?.size_guide || ""
 dispatch(selectSizeGuide(id,size_guide,handleNext))
  }
  
  const updateSizeGuide = (id, data)=>{
    const size_guide = data?.size_guide || ""
 dispatch(sizeGuideEdit(id,size_guide))
  }
  

  const dataStep4 = (id,data,handleNext) => { 
    const body = {
        variants: []
    };

    data.forEach(async(variant) => {
 
        let values = {
            tag: null,
            weight: null,
            price: null,
            porcentDiscount: null,
            discountPrice: null,
            design: null,
            stock: null,
            images: [],
            attributes: { color: null, size: null, material: null }
        };
        
        values.attributes.color = variant.color;
        values.attributes.size = variant.size;
        values.tag = variant.tag;
        values.weight = variant.weight;
        values.price = variant.price;
        values.porcentDiscount = variant.porcentDiscount;
        values.discountPrice = variant.discountPrice;
        values.design = variant.design.textInput;
        values.stock = variant.stock;
        values.images = variant.images;
        
        body.variants.push(values);
    });
    dispatch(onStepNewProduct({...dataProduct, ...body})); 
  
     dispatch(startAddVariantsProduct(id,body, handleNext))

};


const completeStepAddProduct = (id,data, handleReset) => {
  dispatch(finishCreateProduct(id,data, navigate, handleReset))
};

const dataUpdateMainFeatures = (id, data) => {
  const body = {
    brand: "",
    category: "",
    subCategory: "",
    model: '', 
    gender: '',  
    name:""
  };

  body.category = data.category;
  body.subCategory = data.subCategory;

  data.fields.forEach((i) => {
    if (i.id === "brand") body.brand = i.textInput;
    if (i.id === "model") body.model = i.textInput ;
    if (i.id === "gender") body.gender = i.textInput ;
    if (i.id === "name") body.name = i.textInput;
  });
dispatch(StartUpdateMainFeatures(id,body))

};

const updateVariants = (id,data) => {
  
  const body = {
      variants: []
  };

  data.forEach(async(variant) => {

      let values = {
          _id : null,
          tag: null,
          weight: null,
          price: null,
          porcentDiscount: null,
          discountPrice: null,
          design: null,
          stock: null,
          images: [],
          attributes: { color: null, size: null, material: null }
      };
      
      values.attributes.color = variant.color;
      values.attributes.size = variant.size;
      values.tag = variant.tag;
      values.weight = variant.weight;
      values.price = variant.price;
      values.porcentDiscount = variant.porcentDiscount;
      values.discountPrice = variant.discountPrice;
      values.design = variant.design.textInput;
      values.stock = variant.stock;
      values.images = variant.images;
      values._id = variant.id
      
      body.variants.push(values);
  });

   dispatch(startUpdateVariants(id,body))
};

const deleteImageVariant = ( variant_id , image_id ) =>  dispatch(startDeleteImageVariant(variant_id,image_id))

const updateDescription = (id,data) => {
  dispatch(startUpdateDescription(id,data))
};



  
  

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
    dataStep2,
    dataStep3,
    dataStep4,
    completeStepAddProduct,
    dataUpdateMainFeatures,
    updateSizeGuide,
    updateVariants,
    deleteVariant,
    deleteImageVariant,
    updateDescription
  };
};
