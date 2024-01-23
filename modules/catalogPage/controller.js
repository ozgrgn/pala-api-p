import Service from "./service.js";
import _ from "lodash";
const addCatalogPage = async (req, res) => {
  const {
    number,
    type,
    header,
    category,
    image,
    firstFull,
    firstOne,
    firstTwo,
    firstDouble,
    firstDoubleImage,
    secondOne,
    secondTwo,
    secondDouble,
    secondDoubleImage,
    fullImage,
    fullProduct,
    fullProductImage
  } = req.body;

  try {
    let catalogPage = await Service.addCatalogPage(
      number,
      type,
      header,
      category,
      image,
      firstFull,
      firstOne,
      firstTwo,
      firstDouble,
      firstDoubleImage,
      secondOne,
      secondTwo,
      secondDouble,
      secondDoubleImage,
      fullImage,
      fullProduct,
      fullProductImage
    );

    return res.json({
      status: true,
      catalogPage,
    });
  } catch (error) {
    console.log(error.message, "addCatalogPage error");
    return res.json({ status: false, message: error.message });
  }
};

const updateCatalogPage = async (req, res) => {
  const { catalogPage } = req.body;
  const { catalogPageId } = req.params;
  console.log(catalogPage, "sdsfsfsdfsdsf");
  try {
    let updatedCatalogPage = await Service.updateCatalogPage(catalogPageId, catalogPage);

    return res.json({
      status: true,
      updatedCatalogPage,
    });
  } catch (error) {
    console.log(error.message, "updateCatalogPage error");
    return res.json({ status: false, message: error.message });
  }
};

const deleteCatalogPage = async (req, res) => {
  const { catalogPageId } = req.params;

  try {
    await Service.deleteCatalogPage(catalogPageId);

    return res.json({
      status: true,
    });
  } catch (error) {
    console.log(error.message, "deleteCatalogPage error");
    return res.json({ status: false, message: error.message });
  }
};

const getCatalogPages = async (req, res) => {
  const { limit, skip, lang,category } = req.query;

  try {
    const catalogPagesQuery = _.omitBy(
      {
        lang,
        category
      },
      (a) => a === undefined
    );
    let catalogPages = await Service.getCatalogPages(catalogPagesQuery, {
      queryOptions: { limit, skip },
    });

    return res.json({ status: true, ...catalogPages });
  } catch (error) {
    console.log(error.message, "getCatalogPages error");
    return res.json({ status: false, message: error.message });
  }
};

const getCatalogPage = async (req, res) => {
  try {
    const CatalogPageQuery = _.omitBy(
      {
        _id: req.params.catalogPageId,
      },
      (a) => a === undefined
    );

    let catalogPage = await Service.getCatalogPage(CatalogPageQuery);
    return res.json({ status: true, catalogPage });
  } catch (error) {
    console.log(error.message, "getCatalogPage error");
    return res.json({ status: false, message: error.message });
  }
};

export default {
  addCatalogPage,
  updateCatalogPage,
  deleteCatalogPage,
  getCatalogPages,
  getCatalogPage,
};
