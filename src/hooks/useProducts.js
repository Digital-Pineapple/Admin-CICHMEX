import { useDispatch, useSelector } from "react-redux";
import {
  LoadOneProduct,
  StartUpdateMainFeatures,
  addOneProduct,
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
  startLoadProductsByCategory,
  startLoadProductsBySubCategory,
  startLoadProductsForSearch,
  startLoadAllMovements,
  startOutOfStock,
} from "../store/actions/productsActions";
import { useNavigate } from "react-router-dom";
import {
  cleanProductDetail,
  onStepNewProduct,
} from "../store/reducer/productsReducer";
import { startLoadColors } from "../store/actions/uiActions";
import { startAddVariantsize, startAssignMain, startAssignMainOneVariant, startUpdateMultipleImages, startUpdateOneVariant } from "../store/actions/variantActions";
import { validate as isUUID } from "uuid";

export const useProducts = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Selecciona los estados necesarios del store
  const { products, product, stockProducts, productsPaginate, entries, outputs, dataProduct, allMovements, isLoading } =
    useSelector((state) => state.products);
  const { loading, colors } = useSelector((state) => state.ui);

  // Función para cargar todos los productos
  const loadProducts = async () => dispatch(startLoadProducts());

  // Función para cargar todos los productos para búsqueda
  const loadAllProductsForSearch = async () => dispatch(startLoadProductsForSearch());

  // Función para cargar productos por categoría
  const loadProductsByCategory = async (name) => dispatch(startLoadProductsByCategory(name));

  // Función para cargar productos por subcategoría
  const loadProductsBySubCategory = async (name) => dispatch(startLoadProductsBySubCategory(name));

  // Función para cargar productos con paginación
  const loadProductsPaginate = async (page, limit) => dispatch(startLoadAllProducts(page, limit));

  const loadProductsOutOfStock = async (page, limit, minNumber) => dispatch(startOutOfStock(page, limit, minNumber));

  // Función para cargar entradas de productos
  const loadEntriesProducts = async () => dispatch(startLoadEntriesProduct());

  // Función para cargar salidas de productos
  const loadOutputsProducts = async () => dispatch(startLoadOutputsProduct());

  // Función para cargar todas las entradas
  const loadAllInputs = async () => dispatch(startLoadAllInputs());

  // Función para cargar todas las salidas
  const loadAllOutputs = async () => dispatch(startLoadAllOutputs());

  // Función para cargar todos los movimientos
  const loadAllMovements = async () => dispatch(startLoadAllMovements());

  // Función para cargar productos en stock
  const loadStockProducts = async () => dispatch(startLoadStockProducts());

  // Función para cargar productos sin stock
  const loadNoStockProducts = async () => dispatch(startLoadNonExistProduct());

  // Función para cargar un producto específico por ID
  const loadProduct = async (_id) => {
    const response = dispatch(LoadOneProduct(_id));
    return response;
  };

  // Función para crear un nuevo producto
  const createProduct = async (values, images) => {
    dispatch(addOneProduct(values, images, navigate));
  };

  // Función para agregar múltiples entradas
  const addMultipleEntries = async (values) => {
    dispatch(startAddMultipleEntries(values, navigate));
  };

  // Función para agregar múltiples salidas
  const addMultipleOutputs = async (values) => {
    dispatch(startAddMultipleOutputs(values, navigate));
  };

  // Función para editar un producto
  const editProduct = async (id, values) =>
    dispatch(editOneProduct(id, values, navigate));

  // Función para editar una variante de producto
  const editVariant = async (id, values, handleClose) =>
    dispatch(startUpdateOneVariant(id, values, handleClose));

  // Función para actualizar el video de un producto
  const updateVideo = (id, values) => dispatch(updateProductVideos(id, values));

  // Función para actualizar la miniatura de un producto
  const updateThumbnail = (id, values) =>
    dispatch(startUpdateThumbnail(id, values));

  // Función para agregar una imagen a un producto
  const addOneImage = (id, file) => dispatch(startAddOneImage(id, file));

  // Función para eliminar una imagen del detalle de un producto
  const deleteImageDetail = (id, image_id) =>
    dispatch(startDeleteOneImage(id, image_id));

  // Función para eliminar un producto
  const deleteProduct = async (id) => dispatch(deleteOneProduct(id));

  // Función para cambiar la posición de las imágenes de un producto
  const changeImagePositions = async (product_id, images) =>
    dispatch(startChangeImagesPosition(product_id, images, navigate));

  // Función para cargar los colores disponibles
  const loadColors = () => dispatch(startLoadColors());

  // Función para limpiar el detalle de un producto
  const cleanProductD = () => dispatch(cleanProductDetail());

  // Función para eliminar una variante de producto
  const deleteVariant = (id) => {
    dispatch(startDelete(id));
  };

  // Mapear productos en stock para mostrarlos en una tabla
  const rowsStockProducts = stockProducts.map((item, _id) => ({
    id: _id.toString(),
    total: item.price * item.stock,
    ...item,
  }));

  // Mapear productos sin stock para mostrarlos en una tabla
  const rowsOutOfStockProducts = products?.map((item, _id) => ({
    id: _id.toString(),
    ...item,
  }));

  // Mapear todos los productos para mostrarlos en una tabla
  const rowsProducts = products?.map((item, _id) => ({
    id: _id.toString(),
    Category: item?.category?.name,
    SubCategory: item?.subCategory?.name,
    ...item,
  }));

  // Mapear todas las entradas para mostrarlas en una tabla
  const rowsAllInputs = entries?.map((item, index) => ({
    id: index,
    tag: item.tag ? item.tag : item.variant_tag,
    ...item,
  }));

  // Mapear todas las salidas para mostrarlas en una tabla
  const rowsAllOutputs = outputs?.map((item, index) => ({
    id: index,
    ...item,
  }));

  // Función para manejar el paso 1 del flujo de creación de productos
  const dataStep1 = (data, handleNext) => {
    const body = {
      brand: "",
      category: "",
      subCategory: "",
      model: null,
      gender: null,
      name: "",
      product_key:"",
    };

    body.category = data.category;
    body.subCategory = data.subCategory;
    body.product_key = data.product_key;

    data.fields.forEach((i) => {
      if (i.id === "brand") body.brand = i.textInput;
      if (i.id === "model") body.model = i.textInput || null;
      if (i.id === "gender") body.gender = i.textInput || null;
      if (i.id === "name") body.name = i.textInput || null;
    });
    dispatch(startAddProductWithVariants(body, handleNext));
  };

  // Función para manejar el paso 2 del flujo de creación de productos
  const dataStep2 = (id, data, handleNext) => {
    const condition = data.condition;
    dispatch(updateConditionStep(id, condition, handleNext));
  };

  // Función para manejar el paso 3 del flujo de creación de productos
  const dataStep3 = (id, data, handleNext) => {
    const size_guide = data?.size_guide || "";
    dispatch(selectSizeGuide(id, size_guide, handleNext));
  };

  // Función para actualizar la guía de tallas
  const updateSizeGuide = (id, data) => {
    const size_guide = data?.size_guide || "";
    dispatch(sizeGuideEdit(id, size_guide));
  };

  // Función para manejar el paso 4 del flujo de creación de productos
  const dataStep4 = (id, data, handleNext) => {
    const body = {
      variants: [],
    };

    data.forEach(async (variant) => {
      let values = {
        tag: null,
        weight: null,
        price: null,
        purchase_price: null,
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
      values.purchase_price = variant.purchase_price;

      body.variants.push(values);
    });
    dispatch(startAddVariantsProduct(id, body, handleNext));
  };

  // Función para agregar variantes a un producto
  const dataAddVariants = (id, data, handleClose) => {
    const body = {
      variants: [],
      images: [],
    };

    data.forEach((variant) => {
      variant.sizes.forEach((item) => {
        const values = {
          tag: item.tag,
          weight: item.weight,
          purchase_price: item.purchase_price,
          price: item.price,
          porcentDiscount: item.porcentDiscount,
          discountPrice: item.discountPrice,
          design: variant.design.textInput,
          stock: item.stock,
          attributes: {
            color: variant.color.name,
            size: item.size,
            material: null,
          },
        };
        body.variants.push(values);
      });

      variant.images.forEach((img) => {
        const image = {
          filePreview: img.filePreview,
          color: variant.color.name,
        };
        body.images.push(image);
      });
    });

    dispatch(startAddVariantsProductClothes2(id, body, handleClose));
  };

  // Función para manejar variantes de ropa y zapatos
  const dataClothesShoes = (id, data, handleNext) => {
    const body = {
      variants: [],
      images: [],
    };

    data.forEach((variant) => {
      variant.sizes.forEach((item) => {
        const values = {
          tag: item.tag,
          weight: item.weight,
          price: item.price,
          purchase_price: item.purchase_price,
          porcentDiscount: item.porcentDiscount,
          discountPrice: item.discountPrice,
          design: variant.design.textInput,
          stock: item.stock,
          attributes: {
            color: variant.color.name,
            size: item.size,
            material: null,
          },
        };
        body.variants.push(values);
      });

      variant.images.forEach((img) => {
        const image = {
          filePreview: img.filePreview,
          color: variant.color.name,
        };
        body.images.push(image);
      });
    });
    dispatch(startAddVariantsProductClothes(id, body, handleNext));
  };

  // Función para completar el flujo de creación de productos
  const completeStepAddProduct = (id, data, handleReset) => {
    dispatch(finishCreateProduct(id, data, navigate, handleReset));
  };

  // Función para actualizar características principales de un producto
  const dataUpdateMainFeatures = (id, data) => {
    const body = {
      brand: "",
      category: "",
      subCategory: "",
      model: "",
      gender: "",
      name: "",
      product_key: "",
    };

    body.category = data.category;
    body.subCategory = data.subCategory;
    body.product_key = data.product_key;

    data.fields.forEach((i) => {
      if (i.id === "brand") body.brand = i.textInput;
      if (i.id === "model") body.model = i.textInput;
      if (i.id === "gender") body.gender = i.textInput;
      if (i.id === "name") body.name = i.textInput;
    });
    dispatch(StartUpdateMainFeatures(id, body));
  };

  // Función para actualizar variantes de un producto
  const updateVariants = (id, data) => {
    const body = {
      variants: [],
    };

    data.forEach(async (variant) => {
      let values = {
        _id: null,
        tag: null,
        weight: null,
        purchase_price: null,
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
      values.purchase_price = JSON.parse(variant.purchase_price);

      body.variants.push(values);
    });

    dispatch(startUpdateVariants(id, body));
  };

  // Función para eliminar una imagen de una variante
  const deleteImageVariant = (variant_id, image_id) =>
    dispatch(startDeleteImageVariant(variant_id, image_id));

  // Función para actualizar la descripción de un producto
  const updateDescription = (id, data) => {
    dispatch(startUpdateDescription(id, data));
  };

  // Función para actualizar múltiples imágenes de una variante
  const updateMultipleImagesVariant = (data, handleClose) => {
    dispatch(startUpdateMultipleImages(data, handleClose));
  };

  // Función para agregar una nueva talla a una variante
  const addOneSizeVariant = (data, handleClose) => {
    dispatch(startAddVariantsize(data, handleClose));
  };

  // Función para asignar una variante como principal
  const assignMain = (data) => {
    dispatch(startAssignMain(data));
  };

  // Función para asignar una variante específica como principal
  const assignMainOneVariant = (data) => {
    dispatch(startAssignMainOneVariant(data));
  };

  // Función para buscar productos por un valor
  const loadProductsBySearch = (value, page, limit) => {

    dispatch(startSearchProducts(value, page, limit));
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
    loadProductsPaginate,
    loadProductsByCategory,
    loadProductsBySubCategory,
    loadAllProductsForSearch,
    loadAllMovements,
    allMovements,
    isLoading,
    loadProductsOutOfStock
  };
};
