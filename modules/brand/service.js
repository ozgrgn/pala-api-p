import Model from "./model.js";

const getBrands = async (query = {}, options = {}) => {
  console.log(query, "query");
  const { queryOptions } = options;

  const brands = await Model.Brand.find(query, {}, queryOptions).sort({
    order: 1,
  });
  const count = await Model.Brand.countDocuments(query);

  return { brands, count };
};

const getBrand = async (query) => {
  return Model.Brand.findOne(query);
};

const addBrand = async (
  name,
  note,
  isActive,
) => {
  try {
    return new Model.Brand({
      name,
      note,
      isActive,
    }).save();
  } catch (error) {
    console.log("addBrand service error", error);
    throw new Error(error.message);
  }
};

const updateBrand = async (brandId, brand) => {
  try {
    let isExistBrand = await Model.Brand.findById(brandId);

    if (!isExistBrand) {
      throw new Error(
        JSON.stringify({
          en: "Brand is not found.",
          tr: "Brand bulunamadı.",
        })
      );
    }

    return Model.Brand.findOneAndUpdate(
      { _id: isExistBrand._id },
      { ...brand },
      { new: true }
    );
  } catch (error) {
    console.log("updateBrand service error", error);
    throw new Error(error.message);
  }
};

const deleteBrand = async (brandId) => {
  try {
    return Model.Brand.deleteOne({ _id: brandId });
  } catch (error) {
    console.log("deleteBrand service error", error);
    throw new Error(error.message);
  }
};

export default {
  addBrand,
  updateBrand,
  deleteBrand,
  getBrands,
  getBrand,
};
