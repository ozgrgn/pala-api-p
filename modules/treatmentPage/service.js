import Model from "./model.js";

const getTreatmentPages = async (query = {}, options = {}) => {
  console.log(query, "query")
  const { queryOptions } = options;

  const treatmentPages = await Model.TreatmentPage.find(query, {}, queryOptions)
    .sort({
      order: 1,
    });
  const count = await Model.TreatmentPage.countDocuments(query);

  return { treatmentPages, count };
};

const getTreatmentPage = async (query) => {
  return Model.TreatmentPage.findOne(query);
};

const addTreatmentPage = async (
lang,
header,
text
) => {
  try {
    return new Model.TreatmentPage({
      lang,
      header,
      text
    }).save();
  } catch (error) {
    console.log("getTreatmentPage service error", error);
    throw new Error(error.message);
  }
};

const updateTreatmentPage = async (treatmentPageId, treatmentPage) => {
  try {
    let isExistTreatmentPage = await Model.TreatmentPage.findById(treatmentPageId);

    if (!isExistTreatmentPage) {
      throw new Error(
        JSON.stringify({
          en: "TreatmentPage is not found.",
          tr: "TreatmentPage bulunamadı.",
        })
      );
    }

    return Model.TreatmentPage.findOneAndUpdate(
      { _id: isExistTreatmentPage._id },
      { ...treatmentPage },
      { new: true }
    );
  } catch (error) {
    console.log("updateTreatmentPage service error", error);
    throw new Error(error.message);
  }
};

const deleteTreatmentPage = async (treatmentPageId) => {
  try {
    return Model.TreatmentPage.deleteOne({ _id: treatmentPageId });
  } catch (error) {
    console.log("deleteTreatmentPage service error", error);
    throw new Error(error.message);
  }
};



export default {
  addTreatmentPage,
  updateTreatmentPage,
  deleteTreatmentPage,
  getTreatmentPages,
  getTreatmentPage,
};
