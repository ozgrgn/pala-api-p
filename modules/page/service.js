import Model from "./model.js";

const getPages = async (query = {}, options = {}) => {
  const { queryOptions } = options;
  const pages = await Model.Page.find(query, {}, queryOptions).sort({
    order: 1,
  });

  const count = await Model.Page.countDocuments(query);

  return { pages, count };
};

const getPage = async (query) => {
  return Model.Page.findOne(query);
};

const addPage = async (name, perma, lang, content) => {
  try {
    let isExistPage = await Model.Page.findOne({ perma });

    if (isExistPage) {
      throw new Error(
        JSON.stringify({
          en: "Page is already exists.",
          tr: "Page zaten kayıtlı.",
        })
      );
    }

    return new Model.Page({
      name,
      perma,
      lang,
      content,
    }).save();
  } catch (error) {
    console.log("addPage service error", error);
    throw new Error(error.message);
  }
};

const updatePage = async (pageId, page) => {
  try {
    let isExistPage = await Model.Page.findById(pageId);

    if (!isExistPage) {
      throw new Error(
        JSON.stringify({
          en: "Page is not found.",
          tr: "Page bulunamadı.",
        })
      );
    }

    return Model.Page.findOneAndUpdate(
      { _id: isExistPage._id },
      { ...page },
      { new: true }
    );
  } catch (error) {
    console.log("updatePage service error", error);
    throw new Error(error.message);
  }
};

const deletePage = async (pageId) => {
  try {
    return Model.Page.deleteOne({ _id: pageId });
  } catch (error) {
    console.log("deletePage service error", error);
    throw new Error(error.message);
  }
};

const getPageViaPerma = async (query) => {
  return Model.Page.findOne(query);
};

export default {
  addPage,
  updatePage,
  deletePage,
  getPages,
  getPage,
  getPageViaPerma,
};
