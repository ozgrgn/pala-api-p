import Service from "./service.js";
import _ from "lodash";
import moment from "moment";
const addTranslate = async (req, res) => {
  const {
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
  
  } = req.body;

  try {
    let translate = await Service.addTranslate(
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
    );

    return res.json({
      status: true,
      translate,
    });
  } catch (error) {
    console.log(error.message, "addTranslate error");
    return res.json({ status: false, message: error.message });
  }
};

const updateTranslate = async (req, res) => {
  const { translate } = req.body;
  const { translateId } = req.params;
  try {
    let updatedTranslate = await Service.updateTranslate(translateId, translate);

    return res.json({
      status: true,
      updatedTranslate,
    });
  } catch (error) {
    console.log(error.message, "updateTranslate error");
    return res.json({ status: false, message: error.message });
  }
};

const deleteTranslate = async (req, res) => {
  const { translateId } = req.params;

  try {
    await Service.deleteTranslate(translateId);

    return res.json({
      status: true,
    });
  } catch (error) {
    console.log(error.message, "deleteTranslate error");
    return res.json({ status: false, message: error.message });
  }
};

const getTranslates = async (req, res) => {
  const { limit, skip, lang } = req.query;

  try {
    const translatesQuery = _.omitBy(
      {
        lang:lang
      },
      (a) => a === undefined
    );
    let translates = await Service.getTranslates(translatesQuery, {
      queryOptions: { limit, skip },
    });

    return res.json({ status: true, ...translates });
  } catch (error) {
    console.log(error.message, "getTranslates error");
    return res.json({ status: false, message: error.message });
  }
};

const getTranslate = async (req, res) => {
  try {
    const TranslateQuery = _.omitBy(
      {
        _id: req.params.translateId,
      },
      (a) => a === undefined
    );

    let translate = await Service.getTranslate(TranslateQuery);
    return res.json({ status: true, translate });
  } catch (error) {
    console.log(error.message, "getTranslate error");
    return res.json({ status: false, message: error.message });
  }
};

const getTranslateViaPerma = async (req, res) => {
  try {
    const EventQuery = _.omitBy(
      {
        perma: req.params.perma,
      },
      (a) => a === undefined
    );

    let translate = await Service.getTranslateViaPerma(EventQuery);
    return res.json({ status: true, translate });
  } catch (error) {
    console.log(error.message, "getTranslate error");
    return res.json({ status: false, message: error.message });
  }
};
export default {
  addTranslate,
  updateTranslate,
  deleteTranslate,
  getTranslates,
  getTranslate,
  getTranslateViaPerma,
};
