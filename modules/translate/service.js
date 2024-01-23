import Model from "./model.js";

const getTranslates = async (query = {}, options = {}) => {
  const { queryOptions } = options;

  const translates = await Model.Translate.find(query, {}, queryOptions).sort({
    order: 1,
  });

  const count = await Model.Translate.countDocuments(query);

  return { translates, count };
};

const getTranslate = async (query) => {
  return Model.Translate.findOne(query);
};

const addTranslate = async (
  lang,
  homePage,
  about,
  treatments,
  contact,
  language,
  emergency_line,
  weekdays,
  weekendWorkDays,
  monday,
  tuesday,
  wednesday,
  thursday,
  friday,
  saturday,
  sunday,
  allTreatments,
  get_in_touch_with_us,
  call_us_anytime,
  mail_us,
  book_an_appointment,
  write_us,
  name,
  phone,
  mail,
  send,
  phone_required,
  name_required,
  email_required,
  book,
  address,
  book_by_phone,
  note
) => {
  try {
    let isExistTranslate = await Model.Translate.findOne({ lang });

    if (isExistTranslate) {
      throw new Error(
        JSON.stringify({
          en: "Translate is already exists.",
          tr: "Translate zaten kayıtlı.",
        })
      );
    }

    return new Model.Translate({
      lang,
      homePage,
      about,
      treatments,
      contact,
      language,
      emergency_line,
      weekdays,
      weekendWorkDays,
      monday,
      tuesday,
      wednesday,
      thursday,
      friday,
      saturday,
      sunday,
      allTreatments,
      get_in_touch_with_us,
      call_us_anytime,
      mail_us,
      book_an_appointment,
      write_us,
      name,
      phone,
      mail,
      send,
      phone_required,
      name_required,
      email_required,
      book,
      address,
      book_by_phone,
      note
    }).save();
  } catch (error) {
    console.log("addTranslate service error", error);
    throw new Error(error.message);
  }
};

const updateTranslate = async (translateId, translate) => {
  try {
    let isExistTranslate = await Model.Translate.findById(translateId);

    if (!isExistTranslate) {
      throw new Error(
        JSON.stringify({
          en: "Translate is not found.",
          tr: "Translate bulunamadı.",
        })
      );
    }

    return Model.Translate.findOneAndUpdate(
      { _id: isExistTranslate._id },
      { ...translate },
      { new: true }
    );
  } catch (error) {
    console.log("updateTranslate service error", error);
    throw new Error(error.message);
  }
};

const deleteTranslate = async (translateId) => {
  try {
    return Model.Translate.deleteOne({ _id: translateId });
  } catch (error) {
    console.log("deleteTranslate service error", error);
    throw new Error(error.message);
  }
};

const getTranslateViaPerma = async (query) => {
  return Model.Translate.findOne(query);
};

export default {
  addTranslate,
  updateTranslate,
  deleteTranslate,
  getTranslates,
  getTranslate,
  getTranslateViaPerma,
};
