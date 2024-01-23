import Model from "./model.js";

const getCatalogImages = async (query = {}, options = {}) => {
  console.log(query, "query");
  const { queryOptions } = options;

  const catalogImages = await Model.CatalogImage.find(
    query,
    {},
    queryOptions
  ).sort({
    order: 1,
  });
  const count = await Model.CatalogImage.countDocuments(query);

  return { catalogImages, count };
};

const getCatalogImage = async (query) => {
  return Model.CatalogImage.findOne(query);
};

const addCatalogImage = async (image, place, order) => {
  try {
    return new Model.CatalogImage({
      image,
      place,
      order,
    }).save();
  } catch (error) {
    console.log("addCatalogImage service error", error);
    throw new Error(error.message);
  }
};

const updateCatalogImage = async (catalogImageId, catalogImage) => {
  try {
    let isExistCatalogImage = await Model.CatalogImage.findById(catalogImageId);

    if (!isExistCatalogImage) {
      throw new Error(
        JSON.stringify({
          en: "CatalogImage is not found.",
          tr: "CatalogImage bulunamadı.",
        })
      );
    }

    return Model.CatalogImage.findOneAndUpdate(
      { _id: isExistCatalogImage._id },
      { ...catalogImage },
      { new: true }
    );
  } catch (error) {
    console.log("updateCatalogImage service error", error);
    throw new Error(error.message);
  }
};

const deleteCatalogImage = async (catalogImageId) => {
  try {
    return Model.CatalogImage.deleteOne({ _id: catalogImageId });
  } catch (error) {
    console.log("deleteCatalogImage service error", error);
    throw new Error(error.message);
  }
};

export default {
  addCatalogImage,
  updateCatalogImage,
  deleteCatalogImage,
  getCatalogImages,
  getCatalogImage,
};
