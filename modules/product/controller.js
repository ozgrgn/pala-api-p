import Service from "./service.js";
import _ from "lodash";
const addProduct = async (req, res) => {
  const {
    no,
    name,
    cat,
    brand,
    color,
    units,
    prices,
    note,
    order,
    isActive,
    images,
    stockCount,
    catalogName,
    catalogDesc1,
    catalogDesc2,
  } = req.body;

  try {
    let product = await Service.addProduct(
      no,
      name,
      cat,
      brand,
      color,
      units,
      prices,
      note,
      order,
      isActive,
      images,
      stockCount,
      catalogName,
      catalogDesc1,
      catalogDesc2
    );
    return res.json({
      status: true,
      product,
    });
  } catch (error) {
    console.log(error.message, "addProduct error");
    return res.json({ status: false, message: error.message });
  }
};

const updateProduct = async (req, res) => {
  const { product } = req.body;
  const { productId } = req.params;
  try {
    let updatedProduct = await Service.updateProduct(productId, product);

    return res.json({
      status: true,
      updatedProduct,
    });
  } catch (error) {
    console.log(error.message, "updateProduct error");
    return res.json({ status: false, message: error.message });
  }
};

const deleteProduct = async (req, res) => {
  const { productId } = req.params;

  try {
    await Service.deleteProduct(productId);

    return res.json({
      status: true,
    });
  } catch (error) {
    console.log(error.message, "deleteProduct error");
    return res.json({ status: false, message: error.message });
  }
};

const getProducts = async (req, res) => {
  const { limit, skip, cat, brand, isActive, search, campaign,catalogActive } = req.query;

  try {
    const productsQuery = _.omitBy(
      {
        cat,
        brand,
        isActive,
        campaign,
        catalogActive

      },
      (a) => a === undefined
    );

    if (search) {
      productsQuery.$or = [
        { name: { $regex: RegExp(search + ".*", "i") } },
        { no: { $regex: RegExp(search + ".*", "i") } },
      ];
    }
    let products = await Service.getProducts(productsQuery, {
      queryOptions: { limit, skip },
    });

    return res.json({ status: true, ...products });
  } catch (error) {
    console.log(error.message, "getProducts error");
    return res.json({ status: false, message: error.message });
  }
};

const getProduct = async (req, res) => {
  try {
    const ProductQuery = _.omitBy(
      {
        _id: req.params.productId,
      },
      (a) => a === undefined
    );

    let product = await Service.getProduct(ProductQuery);
    return res.json({ status: true, product });
  } catch (error) {
    console.log(error.message, "getProduct error");
    return res.json({ status: false, message: error.message });
  }
};
const getProductById = async (req, res) => {
  try {
    const ProductQuery = _.omitBy(
      {
        _id: req.params.productId,
      },
      (a) => a === undefined
    );

    let product = await Service.getProductById(ProductQuery);
    return res.json({ status: true, product });
  } catch (error) {
    console.log(error.message, "getProduct error");
    return res.json({ status: false, message: error.message });
  }
};
const updatePrices = async (req, res) => {
  const { newProducts } = req.body;
  console.log(newProducts, "sdsfsfsdfsdsf");
  try {
    let updatedPrices = await Service.updatePrices(newProducts);

    return res.json({
      status: true,
      updatedPrices,
    });
  } catch (error) {
    console.log(error.message, "updatedPrices error");
    return res.json({ status: false, message: error.message });
  }
};

export default {
  addProduct,
  updateProduct,
  deleteProduct,
  getProducts,
  getProduct,
  getProductById,
  updatePrices,
};
