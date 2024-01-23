import Service from "./service.js";
import _ from "lodash";
const addCat = async (req, res) => {
  const {
   name,
   note,
   isActive,
   images,
   order
  } = req.body;

  try {
    let cat = await Service.addCat(
      name,
      note,
      isActive,
      images,
      order
    );
    return res.json({
      status: true,
      cat,
    });
  } catch (error) {
    console.log(error.message, "addCat error");
    
    return res.json({ status: false, message: error.message });
  }
};

const updateCat = async (req, res) => {
  const { cat } = req.body;
  const { catId } = req.params;
  console.log(cat, "sdsfsfsdfsdsf");
  try {
    let updatedCat = await Service.updateCat(catId, cat);

    return res.json({
      status: true,
      updatedCat,
    });
  } catch (error) {
    console.log(error.message, "updateCat error");
    return res.json({ status: false, message: error.message });
  }
};

const deleteCat = async (req, res) => {
  const { catId } = req.params;

  try {
    await Service.deleteCat(catId);

    return res.json({
      status: true,
    });
  } catch (error) {
    console.log(error.message, "deleteCat error");
    return res.json({ status: false, message: error.message });
  }
};

const getCats = async (req, res) => {
  const { limit, skip,isActive } = req.query;

  try {
      const catsQuery = _.omitBy(
        {
          isActive,
        },
        (a) => a === undefined
      );
    let cats = await Service.getCats( catsQuery,{
      queryOptions: { limit, skip },
    });

    return res.json({ status: true, ...cats });
  } catch (error) {
    console.log(error.message, "getCats error");
    return res.json({ status: false, message: error.message });
  }
};

const getCat = async (req, res) => {
  try {
    const CatQuery = _.omitBy(
      {
        _id: req.params.catId,
      },
      (a) => a === undefined
    );

    let cat = await Service.getCat(CatQuery);
    return res.json({ status: true, cat });
  } catch (error) {
    console.log(error.message, "getCat error");
    return res.json({ status: false, message: error.message });
  }
};

export default {
  addCat,
  updateCat,
  deleteCat,
  getCats,
  getCat,
};
