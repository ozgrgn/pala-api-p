import Model from "./model.js";

const getProducts = async (query = {}, options = {}) => {
  console.log(query, "query");
  const { queryOptions } = options;
  console.log(queryOptions, "queryoptions");

  const products = await Model.Product.find(query, {}, queryOptions).populate([
    "cat",
    "brand",
  ]);
  const count = await Model.Product.countDocuments(query);
  console.log(query);
  let activeQuery = query;
  activeQuery.isActive = true;
  console.log(query);

  const active = await Model.Product.countDocuments(activeQuery);
  activeQuery.isActive = false;

  const pasive = await Model.Product.countDocuments(activeQuery);

  return { products, count, active, pasive };
};

const getProduct = async (query) => {
  return Model.Product.findOne(query);
};
const getProductById = async (query) => {
  return Model.Product.findOne(query).populate(["brand", "cat"]);
};

const addProduct = async (
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
) => {
  try {
    return new Model.Product({
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
    }).save();
  } catch (error) {
    console.log("addProduct service error", error);
    throw new Error(error.message);
  }
};

const updateProduct = async (productId, product) => {
  console.log(productId,"productid")
  try {
    let isExistProduct = await Model.Product.findById(productId);

    if (!isExistProduct) {
      throw new Error(
        JSON.stringify({
          en: "Product is not found.",
          tr: "Product bulunamadı.",
        })
      );
    }

    return Model.Product.findOneAndUpdate(
      { _id: isExistProduct._id },
      { ...product },
      { new: true }
    );
  } catch (error) {
    console.log("updateProduct service error", error);
    throw new Error(error.message);
  }
};

const deleteProduct = async (productId) => {
  try {
    return Model.Product.deleteOne({ _id: productId });
  } catch (error) {
    console.log("deleteProduct service error", error);
    throw new Error(error.message);
  }
};

const updatePrices = async (newProducts) => {
  let query = newProducts.map((newProduct) => {
    return {
      updateOne: {
        filter: { _id: newProduct._id },
        update: {
          $set: {
            ...newProduct,
          },
        },
        upsert: true,
      },
    };
  });
  return Model.Product.bulkWrite(query);
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
