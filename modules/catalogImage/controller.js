import Service from "./service.js";
import _ from "lodash";
const addCatalogImage = async (req, res) => {
  const { image, place, order } = req.body;

  try {
    let catalogImage = await Service.addCatalogImage(image, place, order);
    console.log(catalogImage, "catalogImageatatat");
    return res.json({
      status: true,
      catalogImage,
    });
  } catch (error) {
    console.log(error.message, "addCatalogImage error");

    return res.json({ status: false, message: error.message });
  }
};

const updateCatalogImage = async (req, res) => {
  const { catalogImage } = req.body;
  const { catalogImageId } = req.params;
  console.log(catalogImage, "sdsfsfsdfsdsf");
  try {
    let updatedCatalogImage = await Service.updateCatalogImage(
      catalogImageId,
      catalogImage
    );

    return res.json({
      status: true,
      updatedCatalogImage,
    });
  } catch (error) {
    console.log(error.message, "updateCatalogImage error");
    return res.json({ status: false, message: error.message });
  }
};

const deleteCatalogImage = async (req, res) => {
  const { catalogImageId } = req.params;

  try {
    await Service.deleteCatalogImage(catalogImageId);

    return res.json({
      status: true,
    });
  } catch (error) {
    console.log(error.message, "deleteCatalogImage error");
    return res.json({ status: false, message: error.message });
  }
};

const getCatalogImages = async (req, res) => {
  const { limit, skip, isActive } = req.query;
  ("");
  try {
    const catalogImagesQuery = _.omitBy(
      {
        isActive,
      },
      (a) => a === undefined
    );
    let catalogImages = await Service.getCatalogImages(catalogImagesQuery, {
      queryOptions: { limit, skip },
    });

    return res.json({ status: true, ...catalogImages });
  } catch (error) {
    console.log(error.message, "getCatalogImages error");
    return res.json({ status: false, message: error.message });
  }
};

const getCatalogImage = async (req, res) => {
  try {
    const CatalogImageQuery = _.omitBy(
      {
        _id: req.params.catalogImageId,
      },
      (a) => a === undefined
    );

    let catalogImage = await Service.getCatalogImage(CatalogImageQuery);
    return res.json({ status: true, catalogImage });
  } catch (error) {
    console.log(error.message, "getCatalogImage error");
    return res.json({ status: false, message: error.message });
  }
};

export default {
  addCatalogImage,
  updateCatalogImage,
  deleteCatalogImage,
  getCatalogImages,
  getCatalogImage,
};
