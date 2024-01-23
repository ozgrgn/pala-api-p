import Model from "./model.js";

const getHomes = async (query = {}, options = {}) => {
  console.log(query, "query");
  const { queryOptions } = options;

  const homes = await Model.Home.find(query, {}, queryOptions).sort({
    order: 1,
  });
  const count = await Model.Home.countDocuments(query);

  return { homes, count };
};

const getHome = async (query) => {
  return Model.Home.findOne(query);
};

const addHome = async (
  lang,
  form_header,
  form_text,
  treatment_spot,
  treatment_header,
  review_spot,
  review_header,
  map_spot,
  map_header,
  map_box_header,
  map_box_desc,
) => {
  try {
    return new Model.Home({
      lang,
      form_header,
      form_text,
      treatment_spot,
      treatment_header,
      review_spot,
      review_header,
      map_spot,
      map_header,
      map_box_header,
      map_box_desc,
    }).save();
  } catch (error) {
    console.log("addHome service error", error);
    throw new Error(error.message);
  }
};

const updateHome = async (homeId, home) => {
  try {
    let isExistHome = await Model.Home.findById(homeId);

    if (!isExistHome) {
      throw new Error(
        JSON.stringify({
          en: "Home is not found.",
          tr: "Home bulunamadı.",
        })
      );
    }

    return Model.Home.findOneAndUpdate(
      { _id: isExistHome._id },
      { ...home },
      { new: true }
    );
  } catch (error) {
    console.log("updateHome service error", error);
    throw new Error(error.message);
  }
};

const deleteHome = async (homeId) => {
  try {
    return Model.Home.deleteOne({ _id: homeId });
  } catch (error) {
    console.log("deleteHome service error", error);
    throw new Error(error.message);
  }
};

export default {
  addHome,
  updateHome,
  deleteHome,
  getHomes,
  getHome,
};
