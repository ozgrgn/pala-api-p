import Service from "./service.js";
import _ from "lodash";
const addLang = async (req, res) => {
  const {
    lang,
    title,
    order,
    isActive,
  } = req.body;

  try {
    let langg = await Service.addLang(
      lang,
      title,
      order,
      isActive
    );

    return res.json({
      status: true,
    });
  } catch (error) {
    console.log(error.message, "addLang error");
    return res.json({ status: false, message: error.message });
  }
};

const updateLang = async (req, res) => {
  const { lang } = req.body;
  const { langId } = req.params;
  try {
    let updatedLang = await Service.updateLang(langId, lang);

    return res.json({
      status: true,
      updatedLang,
    });
  } catch (error) {
    console.log(error.message, "updateLang error");
    return res.json({ status: false, message: error.message });
  }
};

const deleteLang = async (req, res) => {
  const { langId } = req.params;

  try {
    await Service.deleteLang(langId);

    return res.json({
      status: true,
    });
  } catch (error) {
    console.log(error.message, "deleteLang error");
    return res.json({ status: false, message: error.message });
  }
};

const getLangs = async (req, res) => {
  const { limit, skip } = req.query;

  try {
   
    let langs = await Service.getLangs( {
      queryOptions: { limit, skip },
    });

    return res.json({ status: true, ...langs });
  } catch (error) {
    console.log(error.message, "getLangs error");
    return res.json({ status: false, message: error.message });
  }
};

const getLang = async (req, res) => {
  try {
    const LangQuery = _.omitBy(
      {
        _id: req.params.langId,
      },
      (a) => a === undefined
    );

    let lang = await Service.getLang(LangQuery);
    return res.json({ status: true, lang });
  } catch (error) {
    console.log(error.message, "getLang error");
    return res.json({ status: false, message: error.message });
  }
};



export default {
  addLang,
  updateLang,
  deleteLang,
  getLangs,
  getLang,
};
