import Model from "./model.js";

const getTreatments = async (query = {}, options = {}) => {
  console.log(query, "query");
  const { queryOptions } = options;

  const treatments = await Model.Treatment.find(query, {}, queryOptions).sort({
    order: 1,
  });
  const count = await Model.Treatment.countDocuments(query);

  return { treatments, count };
};

const getTreatment = async (query) => {
  return Model.Treatment.findOne(query);
};

const getTreatmentViaPerma = async (query) => {
  return Model.Treatment.findOne(query);
};


const addTreatment = async (
  lang,
  title,
  perma,
  spot,
  header,
  shortDesc,
  text,
  hp,
  icon,
  images,
  isActive,
  order
) => {
  try {
    return new Model.Treatment({
      lang,
      title,
      perma,
      spot,
      header,
      shortDesc,
      text,
      hp,
      icon,
      images,
      isActive,
      order
    }).save();
  } catch (error) {
    console.log("addTreatment service error", error);
    throw new Error(error.message);
  }
};

const updateTreatment = async (treatmentId, treatment) => {
  try {
    let isExistTreatment = await Model.Treatment.findById(treatmentId);

    if (!isExistTreatment) {
      throw new Error(
        JSON.stringify({
          en: "Treatment is not found.",
          tr: "Treatment bulunamadı.",
        })
      );
    }

    return Model.Treatment.findOneAndUpdate(
      { _id: isExistTreatment._id },
      { ...treatment },
      { new: true }
    );
  } catch (error) {
    console.log("updateTreatment service error", error);
    throw new Error(error.message);
  }
};

const deleteTreatment = async (treatmentId) => {
  try {
    return Model.Treatment.deleteOne({ _id: treatmentId });
  } catch (error) {
    console.log("deleteTreatment service error", error);
    throw new Error(error.message);
  }
};

export default {
  addTreatment,
  updateTreatment,
  deleteTreatment,
  getTreatments,
  getTreatment,
  getTreatmentViaPerma
};
