import Model from "./model.js";

const getCats = async (query = {}, options = {}) => {
  console.log(query, "query");
  const { queryOptions } = options;

  const cats = await Model.Cat.find(query, {}, queryOptions).sort({
    order: 1,
  });
  const count = await Model.Cat.countDocuments(query);

  return { cats, count };
};

const getCat = async (query) => {
  return Model.Cat.findOne(query);
};

const addCat = async (
  name,
  note,
  isActive,
  images,
  order
) => {
  try {
    return new Model.Cat({
      name,
      note,
      isActive,
      images,
      order
    }).save();
  } catch (error) {
    console.log("addCat service error", error);
    throw new Error(error.message);
  }
};

const updateCat = async (catId, cat) => {
  try {
    let isExistCat = await Model.Cat.findById(catId);

    if (!isExistCat) {
      throw new Error(
        JSON.stringify({
          en: "Cat is not found.",
          tr: "Cat bulunamadı.",
        })
      );
    }
console.log(cat,"ccscscs")
    return Model.Cat.findOneAndUpdate(
      { _id: isExistCat._id },
      { ...cat },
      { new: true }
    );
  } catch (error) {
    console.log("updateCat service error", error);
    throw new Error(error.message);
  }
};

const deleteCat = async (catId) => {
  try {
    return Model.Cat.deleteOne({ _id: catId });
  } catch (error) {
    console.log("deleteCat service error", error);
    throw new Error(error.message);
  }
};

export default {
  addCat,
  updateCat,
  deleteCat,
  getCats,
  getCat,
};
