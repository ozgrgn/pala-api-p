import Service from "./service.js";
import _ from "lodash";
import moment from "moment";
const addTreatmentPage = async (req, res) => {
  const {
    lang,
    header,
    text
  } = req.body;

  try {
    let treatmentPage = await Service.addTreatmentPage(
      lang,
      header,
      text
    );

    return res.json({
      status: true,
      treatmentPage,
    });
  } catch (error) {
    console.log(error.message, "addTreatmentPage error");
    return res.json({ status: false, message: error.message });
  }
};

const updateTreatmentPage = async (req, res) => {
  const { treatmentPage } = req.body;
  const { treatmentPageId } = req.params;
  console.log(treatmentPage, "sdsfsfsdfsdsf");
  try {
    let updatedTreatmentPage = await Service.updateTreatmentPage(treatmentPageId, treatmentPage);

    return res.json({
      status: true,
      updatedTreatmentPage,
    });
  } catch (error) {
    console.log(error.message, "updateTreatmentPage error");
    return res.json({ status: false, message: error.message });
  }
};

const deleteTreatmentPage = async (req, res) => {
  const { treatmentPageId } = req.params;

  try {
    await Service.deleteTreatmentPage(treatmentPageId);

    return res.json({
      status: true,
    });
  } catch (error) {
    console.log(error.message, "deleteTreatmentPage error");
    return res.json({ status: false, message: error.message });
  }
};

const getTreatmentPages = async (req, res) => {
  const { limit, skip, lang } = req.query;

  try {
    const treatmentPagesQuery = _.omitBy(
      {
        lang,
      },
      (a) => a === undefined
    );
    let treatmentPages = await Service.getTreatmentPages(treatmentPagesQuery, {
      queryOptions: { limit, skip },
    });

    return res.json({ status: true, ...treatmentPages });
  } catch (error) {
    console.log(error.message, "getTreatmentPages error");
    return res.json({ status: false, message: error.message });
  }
};

const getTreatmentPage = async (req, res) => {
  try {
    const TreatmentPageQuery = _.omitBy(
      {
        _id: req.params.treatmentPageId,
      },
      (a) => a === undefined
    );

    let treatmentPage = await Service.getTreatmentPage(TreatmentPageQuery);
    return res.json({ status: true, treatmentPage });
  } catch (error) {
    console.log(error.message, "getTreatmentPage error");
    return res.json({ status: false, message: error.message });
  }
};


export default {
  addTreatmentPage,
  updateTreatmentPage,
  deleteTreatmentPage,
  getTreatmentPages,
  getTreatmentPage,
};
