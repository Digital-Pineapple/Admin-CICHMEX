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
  startChangeImagesPosition,
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
  startAddVariantsProductClothes,
  startAddVariantsProductUpdate,
  startAddVariantsProductClothes2,
  startSearchProducts,
  startLoadAllProducts,
} from "../store/actions/productsActions";
import { useNavigate } from "react-router-dom";
import {
  cleanProductDetail,
  onStepNewProduct,
} from "../store/reducer/productsReducer";
import { startLoadColors } from "../store/actions/uiActions";
import { color } from "@mui/system";
import { startAddVariantsize, startAssignMain, startAssignMainOneVariant, startUpdateMultipleImages, startUpdateOneVariant } from "../store/actions/variantActions";

export const useProducts = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { products, product, stockProducts, productsPaginate, entries, outputs, dataProduct } =
    useSelector((state) => state.products);
  const { loading, colors } = useSelector((state) => state.ui);

  const loadProducts = async () => dispatch(startLoadProducts());
  const loadProductsPaginate = async (page, limit) => dispatch(startLoadAllProducts(page, limit));

  const loadEntriesProducts = async () => dispatch(startLoadEntriesProduct());
  const loadOutputsProducts = async () => dispatch(startLoadOutputsProduct());
  const loadAllInputs = async () => dispatch(startLoadAllInputs());
  const loadAllOutputs = async () => dispatch(startLoadAllOutputs());
  const loadStockProducts = async () => dispatch(startLoadStockProducts());
  const loadNoStockProducts = async () => dispatch(startLoadNonExistProduct());
  const loadProduct = async (_id) => {
    const response = dispatch(LoadOneProduct(_id));
    return response;
  };

  const createProduct = async (values, images) => {
    dispatch(addOneProduct(values, images, navigate));
  };
  const addMultipleEntries = async (values) => {
    dispatch(startAddMultipleEntries(values, navigate));
  };
  const addMultipleOutputs = async (values) => {
    dispatch(startAddMultipleOutputs(values, navigate));
  };

  const editProduct = async (id, values) =>
    dispatch(editOneProduct(id, values, navigate));

  const editVariant = async (id, values, handleClose) =>
    dispatch(startUpdateOneVariant(id, values, handleClose));

  const updateVideo = (id, values) => dispatch(updateProductVideos(id, values));
  const updateThumbnail = (id, values) =>
    dispatch(startUpdateThumbnail(id, values));
  const addOneImage = (id, file) => dispatch(startAddOneImage(id, file));
  const deleteImageDetail = (id, image_id) =>
    dispatch(startDeleteOneImage(id, image_id));
  const deleteProduct = async (id) => dispatch(deleteOneProduct(id));
  const changeImagePositions = async (product_id, images) =>
    dispatch(startChangeImagesPosition(product_id, images, navigate));
  const loadColors = () => dispatch(startLoadColors());

  const cleanProductD = () => dispatch(cleanProductDetail());

  const deleteVariant = (id) => {
    return dispatch(startDelete(id));
  };

  const rowsStockProducts = stockProducts.map((item, _id) => ({
    id: _id.toString(),
    total: item.price * item.stock,
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
    tag: item.tag ? item.tag : item.variant_tag,
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
      name: "",
    };

    body.category = data.category;
    body.subCategory = data.subCategory;

    data.fields.forEach((i) => {
      if (i.id === "brand") body.brand = i.textInput;
      if (i.id === "model") body.model = i.textInput || null;
      if (i.id === "gender") body.gender = i.textInput || null;
      if (i.id === "name") body.name = i.textInput || null;
    });
    dispatch(startAddProductWithVariants(body, handleNext));
  };

  const dataStep2 = (id, data, handleNext) => {
    const condition = data.condition;
    dispatch(updateConditionStep(id, condition, handleNext));
  };

  const dataStep3 = (id, data, handleNext) => {
    const size_guide = data?.size_guide || "";
    dispatch(selectSizeGuide(id, size_guide, handleNext));
  };

  const updateSizeGuide = (id, data) => {
    const size_guide = data?.size_guide || "";
    dispatch(sizeGuideEdit(id, size_guide));
  };

  const dataStep4 = (id, data, handleNext) => {
    const body = {
      variants: [],
    };

    data.forEach(async (variant) => {
      let values = {
        tag: null,
        weight: null,
        price: null,
        porcentDiscount: null,
        discountPrice: null,
        design: null,
        stock: null,
        images: [],
        attributes: { color: null, size: null, material: null },
      };

      values.attributes.color = variant.color;
      values.attributes.size = variant.size;
      values.attributes.material = values.attributes.material;
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
    dispatch(startAddVariantsProduct(id, body, handleNext));
  };

  const dataAddVariants = (id, data, handleClose) => {
    
    const body = {
      variants: [],
      images: [],
    };
  
    data.forEach((variant) => {
      variant.sizes.forEach((item) => {
        const values = {
          tag: item.tag, // Etiqueta del tamaño
          weight: item.weight, // Peso del tamaño
          price: item.price, // Precio del tamaño
          porcentDiscount: item.porcentDiscount, // Porcentaje de descuento
          discountPrice: item.discountPrice, // Precio con descuento
          design: variant.design.textInput, // Texto del diseño
          stock: item.stock, // Stock
          attributes: {
            color: variant.color.name, // Nombre del color
            size: item.size, // Tamaño
            material: null, // Sin material definido
          },
        };
        body.variants.push(values); // Agregar al array de variantes
      });
  
      // Procesar imágenes
      variant.images.forEach((img) => {
        const image = {
          filePreview: img.filePreview,
          color: variant.color.name,
        };
        body.images.push(image); // Agregar al array de imágenes
      });
    });
  
    dispatch(startAddVariantsProductClothes2(id, body, handleClose));
  };

  const dataClothesShoes = (id, data, handleNext) => {
  
    const body = {
      variants: [],
      images: [],
    };
  
    data.forEach((variant) => {
      variant.sizes.forEach((item) => {
        const values = {
          tag: item.tag, // Etiqueta del tamaño
          weight: item.weight, // Peso del tamaño
          price: item.price, // Precio del tamaño
          porcentDiscount: item.porcentDiscount, // Porcentaje de descuento
          discountPrice: item.discountPrice, // Precio con descuento
          design: variant.design.textInput, // Texto del diseño
          stock: item.stock, // Stock
          attributes: {
            color: variant.color.name, // Nombre del color
            size: item.size, // Tamaño
            material: null, // Sin material definido
          },
        };
        body.variants.push(values); // Agregar al array de variantes
      });
  
      // Procesar imágenes
      variant.images.forEach((img) => {
        const image = {
          filePreview: img.filePreview,
          color: variant.color.name,
        };
        body.images.push(image); // Agregar al array de imágenes
      });
    });
  
    dispatch(startAddVariantsProductClothes(id, body, handleNext));
  };
  

  const completeStepAddProduct = (id, data, handleReset) => {
    dispatch(finishCreateProduct(id, data, navigate, handleReset));
  };

  const dataUpdateMainFeatures = (id, data) => {
    const body = {
      brand: "",
      category: "",
      subCategory: "",
      model: "",
      gender: "",
      name: "",
    };

    body.category = data.category;
    body.subCategory = data.subCategory;

    data.fields.forEach((i) => {
      if (i.id === "brand") body.brand = i.textInput;
      if (i.id === "model") body.model = i.textInput;
      if (i.id === "gender") body.gender = i.textInput;
      if (i.id === "name") body.name = i.textInput;
    });
    dispatch(StartUpdateMainFeatures(id, body));
  };

  const updateVariants = (id, data) => {
    const body = {
      variants: [],
    };

    data.forEach(async (variant) => {
      let values = {
        _id: null,
        tag: null,
        weight: null,
        price: null,
        porcentDiscount: null,
        discountPrice: null,
        design: null,
        stock: null,
        images: [],
        attributes: { color: null, size: null, material: null },
      };

      values.attributes.color = variant.color;
      values.attributes.size = variant.size;
      values.attributes.material = variant.material;
      values.tag = variant.tag;
      values.weight = variant.weight;
      values.price = variant.price;
      values.porcentDiscount = variant.porcentDiscount;
      values.discountPrice = variant.discountPrice;
      values.design = variant.design.textInput;
      values.stock = variant.stock;
      values.images = variant.images;
      values._id = variant.id;

      body.variants.push(values);
    });

    dispatch(startUpdateVariants(id, body));
  };

  const deleteImageVariant = (variant_id, image_id) =>
    dispatch(startDeleteImageVariant(variant_id, image_id));

  const updateDescription = (id, data) => {
    dispatch(startUpdateDescription(id, data));
  };

  const updateMultipleImagesVariant =(data, handleClose)=>{
    dispatch(startUpdateMultipleImages(data, handleClose))
  }

  const addOneSizeVariant =(data, handleClose)=>{
    dispatch(startAddVariantsize(data, handleClose))
  }
  const assignMain =(data)=>{
    dispatch(startAssignMain(data))
  }
  const assignMainOneVariant =(data)=>{
    dispatch(startAssignMainOneVariant(data))
  }
  const loadProductsBySearch =(value)=>{
    dispatch(startSearchProducts(value))
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
    changeImagePositions,
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
    updateDescription,
    loadColors,
    colors,
    dataClothesShoes,
    editVariant,
    updateMultipleImagesVariant,
    dataAddVariants,
    addOneSizeVariant,
    assignMain,
    assignMainOneVariant,
    productsPaginate,
    loadProductsBySearch,
    loadProductsPaginate
  };
};
