import Model from "./model.js";

const getPhases = async (query = {}, options = {}) => {
  console.log(query, "query");
  const { queryOptions } = options;

  const phases = await Model.Phase.find(query, {}, queryOptions).sort({
    order: 1,
  });
  const count = await Model.Phase.countDocuments(query);

  return { phases, count };
};

const getPhase = async (query) => {
  return Model.Phase.findOne(query);
};

const addPhase = async (
  name,
  note,
  isActive,
) => {
  try {
    return new Model.Phase({
      name,
      note,
      isActive,
    }).save();
  } catch (error) {
    console.log("addPhase service error", error);
    throw new Error(error.message);
  }
};

const updatePhase = async (phaseId, phase) => {
  try {
    let isExistPhase = await Model.Phase.findById(phaseId);

    if (!isExistPhase) {
      throw new Error(
        JSON.stringify({
          en: "Phase is not found.",
          tr: "Phase bulunamadı.",
        })
      );
    }

    return Model.Phase.findOneAndUpdate(
      { _id: isExistPhase._id },
      { ...phase },
      { new: true }
    );
  } catch (error) {
    console.log("updatePhase service error", error);
    throw new Error(error.message);
  }
};

const deletePhase = async (phaseId) => {
  try {
    return Model.Phase.deleteOne({ _id: phaseId });
  } catch (error) {
    console.log("deletePhase service error", error);
    throw new Error(error.message);
  }
};

export default {
  addPhase,
  updatePhase,
  deletePhase,
  getPhases,
  getPhase,
};
