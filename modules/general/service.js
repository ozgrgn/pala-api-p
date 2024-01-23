import Model from "./model.js";

const getGenerals = async (query = {}, options = {}) => {
  const { queryOptions } = options;

  const generals = await Model.General.find(query, {}, queryOptions).sort({
    order: 1,
  });

  const count = await Model.General.countDocuments(query);

  return { generals, count };
};

const getGeneral = async (query) => {
  return Model.General.findOne(query);
};

const addGeneral = async (
  lang,
  phone1,
  phone2,
  address1,
  address2,
  email1,
  email2,
  facebook,
  instagram,
  youtube,
  whatsapp,
  copright,
  weekend,
  weekday,
  shortDesc,
  logo1,
  logo2,
  map1,
  map2,
  other1,
  brand,
) => {
  try {
    let isExistGeneral = await Model.General.findOne({ lang });

    if (isExistGeneral) {
      throw new Error(
        JSON.stringify({
          en: "General is already exists.",
          tr: "General zaten kayıtlı.",
        })
      );
    }

    return new Model.General({
      lang,
      phone1,
      phone2,
      address1,
      address2,
      email1,
      email2,
      facebook,
      instagram,
      youtube,
      whatsapp,
      copright,
      weekend,
      weekday,
      shortDesc,
      logo1,
      logo2,
      map1,
      map2,
      other1,
      brand,
    }).save();
  } catch (error) {
    console.log("addGeneral service error", error);
    throw new Error(error.message);
  }
};

const updateGeneral = async (generalId, general) => {
  try {
    let isExistGeneral = await Model.General.findById(generalId);

    if (!isExistGeneral) {
      throw new Error(
        JSON.stringify({
          en: "General is not found.",
          tr: "General bulunamadı.",
        })
      );
    }

    return Model.General.findOneAndUpdate(
      { _id: isExistGeneral._id },
      { ...general },
      { new: true }
    );
  } catch (error) {
    console.log("updateGeneral service error", error);
    throw new Error(error.message);
  }
};

const deleteGeneral = async (generalId) => {
  try {
    return Model.General.deleteOne({ _id: generalId });
  } catch (error) {
    console.log("deleteGeneral service error", error);
    throw new Error(error.message);
  }
};

const getGeneralViaPerma = async (query) => {
  return Model.General.findOne(query);
};

export default {
  addGeneral,
  updateGeneral,
  deleteGeneral,
  getGenerals,
  getGeneral,
  getGeneralViaPerma,
};
