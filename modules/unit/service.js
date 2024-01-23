import Model from "./model.js";

const getUnits = async (query = {}, options = {}) => {
  console.log(query, "query");
  const { queryOptions } = options;

  const units = await Model.Unit.find(query, {}, queryOptions).sort({
    order: 1,
  });
  const count = await Model.Unit.countDocuments(query);

  return { units, count };
};

const getUnit = async (query) => {
  return Model.Unit.findOne(query);
};

const addUnit = async (
  name,
  note,
  isActive,
) => {
  try {
    return new Model.Unit({
      name,
      note,
      isActive,
    }).save();
  } catch (error) {
    console.log("addUnit service error", error);
    throw new Error(error.message);
  }
};

const updateUnit = async (unitId, unit) => {
  try {
    let isExistUnit = await Model.Unit.findById(unitId);

    if (!isExistUnit) {
      throw new Error(
        JSON.stringify({
          en: "Unit is not found.",
          tr: "Unit bulunamadı.",
        })
      );
    }

    return Model.Unit.findOneAndUpdate(
      { _id: isExistUnit._id },
      { ...unit },
      { new: true }
    );
  } catch (error) {
    console.log("updateUnit service error", error);
    throw new Error(error.message);
  }
};

const deleteUnit = async (unitId) => {
  try {
    return Model.Unit.deleteOne({ _id: unitId });
  } catch (error) {
    console.log("deleteUnit service error", error);
    throw new Error(error.message);
  }
};

export default {
  addUnit,
  updateUnit,
  deleteUnit,
  getUnits,
  getUnit,
};
