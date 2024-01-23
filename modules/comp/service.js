import Model from "./model.js";

const getComps = async (query = {}, options = {}) => {
  console.log(query, "query");
  const { queryOptions } = options;

  const comps = await Model.Comp.find(query, {}, queryOptions).sort({
    order: 1,
  });
  const count = await Model.Comp.countDocuments(query);

  return { comps, count };
};

const getComp = async (query) => {
  return Model.Comp.findOne(query);
};

const addComp = async (
  name,
  note,
  isActive,
) => {
  try {
    return new Model.Comp({
      name,
      note,
      isActive,
    }).save();
  } catch (error) {
    console.log("addComp service error", error);
    throw new Error(error.message);
  }
};

const updateComp = async (compId, comp) => {
  try {
    let isExistComp = await Model.Comp.findById(compId);

    if (!isExistComp) {
      throw new Error(
        JSON.stringify({
          en: "Comp is not found.",
          tr: "Comp bulunamadı.",
        })
      );
    }

    return Model.Comp.findOneAndUpdate(
      { _id: isExistComp._id },
      { ...comp },
      { new: true }
    );
  } catch (error) {
    console.log("updateComp service error", error);
    throw new Error(error.message);
  }
};

const deleteComp = async (compId) => {
  try {
    return Model.Comp.deleteOne({ _id: compId });
  } catch (error) {
    console.log("deleteComp service error", error);
    throw new Error(error.message);
  }
};

export default {
  addComp,
  updateComp,
  deleteComp,
  getComps,
  getComp,
};
