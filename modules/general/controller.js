import Service from "./service.js";
import _ from "lodash";
import moment from "moment";
const addGeneral = async (req, res) => {
  const {
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
  
  } = req.body;

  try {
    let general = await Service.addGeneral(
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
    );

    return res.json({
      status: true,
      general,
    });
  } catch (error) {
    console.log(error.message, "addGeneral error");
    return res.json({ status: false, message: error.message });
  }
};

const updateGeneral = async (req, res) => {
  const { general } = req.body;
  const { generalId } = req.params;
  try {
    let updatedGeneral = await Service.updateGeneral(generalId, general);

    return res.json({
      status: true,
      updatedGeneral,
    });
  } catch (error) {
    console.log(error.message, "updateGeneral error");
    return res.json({ status: false, message: error.message });
  }
};

const deleteGeneral = async (req, res) => {
  const { generalId } = req.params;

  try {
    await Service.deleteGeneral(generalId);

    return res.json({
      status: true,
    });
  } catch (error) {
    console.log(error.message, "deleteGeneral error");
    return res.json({ status: false, message: error.message });
  }
};

const getGenerals = async (req, res) => {
  const { limit, skip, lang } = req.query;

  try {
    const generalsQuery = _.omitBy(
      {
        lang:lang
      },
      (a) => a === undefined
    );
    let generals = await Service.getGenerals(generalsQuery, {
      queryOptions: { limit, skip },
    });

    return res.json({ status: true, ...generals });
  } catch (error) {
    console.log(error.message, "getGenerals error");
    return res.json({ status: false, message: error.message });
  }
};

const getGeneral = async (req, res) => {
  try {
    const GeneralQuery = _.omitBy(
      {
        _id: req.params.generalId,
      },
      (a) => a === undefined
    );

    let general = await Service.getGeneral(GeneralQuery);
    return res.json({ status: true, general });
  } catch (error) {
    console.log(error.message, "getGeneral error");
    return res.json({ status: false, message: error.message });
  }
};

const getGeneralViaPerma = async (req, res) => {
  try {
    const EventQuery = _.omitBy(
      {
        perma: req.params.perma,
      },
      (a) => a === undefined
    );

    let general = await Service.getGeneralViaPerma(EventQuery);
    return res.json({ status: true, general });
  } catch (error) {
    console.log(error.message, "getGeneral error");
    return res.json({ status: false, message: error.message });
  }
};
export default {
  addGeneral,
  updateGeneral,
  deleteGeneral,
  getGenerals,
  getGeneral,
  getGeneralViaPerma,
};
