import Service from "./service.js";
import _ from "lodash";
const addHome = async (req, res) => {
  const {
    lang,
    form_header,
    form_text,
    treatment_spot,
    treatment_header,
    review_spot,
    review_header,
    map_spot,
    map_header,
    map_box_header,
    map_box_desc,
  } = req.body;

  try {
    let home = await Service.addHome(
      lang,
      form_header,
      form_text,
      treatment_spot,
      treatment_header,
      review_spot,
      review_header,
      map_spot,
      map_header,
      map_box_header,
      map_box_desc,
    );

    return res.json({
      status: true,
      home,
    });
  } catch (error) {
    console.log(error.message, "addHome error");
    return res.json({ status: false, message: error.message });
  }
};

const updateHome = async (req, res) => {
  const { home } = req.body;
  const { homeId } = req.params;
  console.log(home, "sdsfsfsdfsdsf");
  try {
    let updatedHome = await Service.updateHome(homeId, home);

    return res.json({
      status: true,
      updatedHome,
    });
  } catch (error) {
    console.log(error.message, "updateHome error");
    return res.json({ status: false, message: error.message });
  }
};

const deleteHome = async (req, res) => {
  const { homeId } = req.params;

  try {
    await Service.deleteHome(homeId);

    return res.json({
      status: true,
    });
  } catch (error) {
    console.log(error.message, "deleteHome error");
    return res.json({ status: false, message: error.message });
  }
};

const getHomes = async (req, res) => {
  const { limit, skip, lang } = req.query;

  try {
    const homesQuery = _.omitBy(
      {
        lang,
      },
      (a) => a === undefined
    );
    let homes = await Service.getHomes(homesQuery, {
      queryOptions: { limit, skip },
    });

    return res.json({ status: true, ...homes });
  } catch (error) {
    console.log(error.message, "getHomes error");
    return res.json({ status: false, message: error.message });
  }
};

const getHome = async (req, res) => {
  try {
    const HomeQuery = _.omitBy(
      {
        _id: req.params.homeId,
      },
      (a) => a === undefined
    );

    let home = await Service.getHome(HomeQuery);
    return res.json({ status: true, home });
  } catch (error) {
    console.log(error.message, "getHome error");
    return res.json({ status: false, message: error.message });
  }
};

export default {
  addHome,
  updateHome,
  deleteHome,
  getHomes,
  getHome,
};
