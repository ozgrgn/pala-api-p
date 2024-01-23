import Model from "./model.js";

const getMemberships = async (query = {}, options = {}) => {
  console.log(query, "query");
  const { queryOptions } = options;

  const memberships = await Model.Membership.find(query, {}, queryOptions).sort({
    order: 1,
  });
  const count = await Model.Membership.countDocuments(query);

  return { memberships, count };
};

const getMembership = async (query) => {
  return Model.Membership.findOne(query);
};

const addMembership = async (
  name,
  note,
  isActive,
) => {
  try {
    return new Model.Membership({
      name,
      note,
      isActive,
    }).save();
  } catch (error) {
    console.log("addMembership service error", error);
    throw new Error(error.message);
  }
};

const updateMembership = async (membershipId, membership) => {
  try {
    let isExistMembership = await Model.Membership.findById(membershipId);

    if (!isExistMembership) {
      throw new Error(
        JSON.stringify({
          en: "Membership is not found.",
          tr: "Membership bulunamadı.",
        })
      );
    }

    return Model.Membership.findOneAndUpdate(
      { _id: isExistMembership._id },
      { ...membership },
      { new: true }
    );
  } catch (error) {
    console.log("updateMembership service error", error);
    throw new Error(error.message);
  }
};

const deleteMembership = async (membershipId) => {
  try {
    return Model.Membership.deleteOne({ _id: membershipId });
  } catch (error) {
    console.log("deleteMembership service error", error);
    throw new Error(error.message);
  }
};

export default {
  addMembership,
  updateMembership,
  deleteMembership,
  getMemberships,
  getMembership,
};
