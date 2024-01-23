import Service from "./service.js";
import _ from "lodash";
const addTreatment = async (req, res) => {
  const {
    lang,
    title,
    perma,
    spot,
    header,
    shortDesc,
    text,
    hp,
    icon,
    images,
    isActive,
    order,
  } = req.body;

  try {
    let treatment = await Service.addTreatment(
      lang,
      title,
      perma,
      spot,
      header,
      shortDesc,
      text,
      hp,
      icon,
      images,
      isActive,
      order
    );

    return res.json({
      status: true,
      treatment,
    });
  } catch (error) {
    console.log(error.message, "addTreatment error");
    return res.json({ status: false, message: error.message });
  }
};

const updateTreatment = async (req, res) => {
  const { treatment } = req.body;
  const { treatmentId } = req.params;
  console.log(treatment, "sdsfsfsdfsdsf");
  try {
    let updatedTreatment = await Service.updateTreatment(
      treatmentId,
      treatment
    );

    return res.json({
      status: true,
      updatedTreatment,
    });
  } catch (error) {
    console.log(error.message, "updateTreatment error");
    return res.json({ status: false, message: error.message });
  }
};

const deleteTreatment = async (req, res) => {
  const { treatmentId } = req.params;

  try {
    await Service.deleteTreatment(treatmentId);

    return res.json({
      status: true,
    });
  } catch (error) {
    console.log(error.message, "deleteTreatment error");
    return res.json({ status: false, message: error.message });
  }
};

const getTreatments = async (req, res) => {
  const { limit, skip, lang, hp } = req.query;

  try {
    const treatmentsQuery = _.omitBy(
      {
        lang,
        hp
      },
      (a) => a === undefined
    );
    let treatments = await Service.getTreatments(treatmentsQuery, {
      queryOptions: { limit, skip },
    });

    return res.json({ status: true, ...treatments });
  } catch (error) {
    console.log(error.message, "getTreatments error");
    return res.json({ status: false, message: error.message });
  }
};

const getTreatment = async (req, res) => {
  try {
    const TreatmentQuery = _.omitBy(
      {
        _id: req.params.treatmentId,
      },
      (a) => a === undefined
    );

    let treatment = await Service.getTreatment(TreatmentQuery);
    return res.json({ status: true, treatment });
  } catch (error) {
    console.log(error.message, "getTreatment error");
    return res.json({ status: false, message: error.message });
  }
};
const getTreatmentViaPerma = async (req, res) => {
  try {
    const TreatmentQuery = _.omitBy(
      {
        perma: req.params.perma,
      },
      (a) => a === undefined
    );

    let treatment = await Service.getTreatmentViaPerma(TreatmentQuery);
    return res.json({ status: true, treatment });
  } catch (error) {
    console.log(error.message, "getTreatment error");
    return res.json({ status: false, message: error.message });
  }
};

export default {
  addTreatment,
  updateTreatment,
  deleteTreatment,
  getTreatments,
  getTreatment,
  getTreatmentViaPerma,
};
