import Model from "./model.js";

const getLangs = async (query = {}, options = {}) => {
  console.log(query, "query")
  const { queryOptions } = options;

  const langs = await Model.Lang.find(query, {}, queryOptions)
    .sort({
      order: 1,
    });
  const count = await Model.Lang.countDocuments(query);

  return { langs, count };
};

const getLang = async (query) => {
  return Model.Lang.findOne(query);
};

const addLang = async (
  lang,
  title,
  order,
  isActive
) => {
  try {
    return new Model.Lang({
      lang,
      title,
      order,
      isActive
    }).save();
  } catch (error) {
    console.log("addLang service error", error);
    throw new Error(error.message);
  }
};

const updateLang = async (langId, lang) => {
  try {
    let isExistLang = await Model.Lang.findById(langId);

    if (!isExistLang) {
      throw new Error(
        JSON.stringify({
          en: "Lang is not found.",
          tr: "Lang bulunamadı.",
        })
      );
    }

    return Model.Lang.findOneAndUpdate(
      { _id: isExistLang._id },
      { ...lang },
      { new: true }
    );
  } catch (error) {
    console.log("updateLang service error", error);
    throw new Error(error.message);
  }
};

const deleteLang = async (langId) => {
  try {
    return Model.Lang.deleteOne({ _id: langId });
  } catch (error) {
    console.log("deleteLang service error", error);
    throw new Error(error.message);
  }
};

export default {
  addLang,
  updateLang,
  deleteLang,
  getLangs,
  getLang,
};
