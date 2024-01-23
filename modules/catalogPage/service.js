import Model from "./model.js";

const getCatalogPages = async (query = {}, options = {}) => {
  console.log(query, "query");
  const { queryOptions } = options;

  const catalogPages = await Model.CatalogPage.find(
    query,
    {},
    queryOptions
  ).populate(["firstFull","firstOne","firstTwo","firstDouble","secondOne","secondTwo","secondDouble","category"]).sort({
    number: 1,
  });
  const count = await Model.CatalogPage.countDocuments(query);

  return { catalogPages, count };
};

const getCatalogPage = async (query) => {
  return Model.CatalogPage.findOne(query);
};

const addCatalogPage = async (
  number,
  type,
  header,
  category,
  image,
  firstFull,
  firstOne,
  firstTwo,
  firstDouble,
  firstDoubleImage,
  secondOne,
  secondTwo,
  secondDouble,
  secondDoubleImage,
  fullImage,
  fullProduct,
  fullProductImage
) => {
  try {
    return new Model.CatalogPage({
      number,
      type,
      header,
      category,
      image,
      firstFull,
      firstOne,
      firstTwo,
      firstDouble,
      firstDoubleImage,
      secondOne,
      secondTwo,
      secondDouble,
      secondDoubleImage,
      fullImage,
      fullProduct,
      fullProductImage,
    }).save();
  } catch (error) {
    console.log("addCatalogPage service error", error);
    throw new Error(error.message);
  }
};

const updateCatalogPage = async (catalogPageId, catalogPage) => {
  try {
    let isExistCatalogPage = await Model.CatalogPage.findById(catalogPageId);

    if (!isExistCatalogPage) {
      throw new Error(
        JSON.stringify({
          en: "CatalogPage is not found.",
          tr: "CatalogPage bulunamadı.",
        })
      );
    }

    return Model.CatalogPage.findOneAndUpdate(
      { _id: isExistCatalogPage._id },
      { ...catalogPage },
      { new: true }
    );
  } catch (error) {
    console.log("updateCatalogPage service error", error);
    throw new Error(error.message);
  }
};

const deleteCatalogPage = async (catalogPageId) => {
  try {
    return Model.CatalogPage.deleteOne({ _id: catalogPageId });
  } catch (error) {
    console.log("deleteCatalogPage service error", error);
    throw new Error(error.message);
  }
};

export default {
  addCatalogPage,
  updateCatalogPage,
  deleteCatalogPage,
  getCatalogPages,
  getCatalogPage,
};
