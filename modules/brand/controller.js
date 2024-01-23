import Service from "./service.js";
import _ from "lodash";
const addBrand = async (req, res) => {
  const {
   name,
   note,
   isActive,
  } = req.body;

  try {
    let brand = await Service.addBrand(
      name,
      note,
      isActive,
    );
    console.log(brand,"brandatatat")
    return res.json({
      status: true,
      brand,
    });
  } catch (error) {
    console.log(error.message, "addBrand error");
    
    return res.json({ status: false, message: error.message });
  }
};

const updateBrand = async (req, res) => {
  const { brand } = req.body;
  const { brandId } = req.params;
  console.log(brand, "sdsfsfsdfsdsf");
  try {
    let updatedBrand = await Service.updateBrand(brandId, brand);

    return res.json({
      status: true,
      updatedBrand,
    });
  } catch (error) {
    console.log(error.message, "updateBrand error");
    return res.json({ status: false, message: error.message });
  }
};

const deleteBrand = async (req, res) => {
  const { brandId } = req.params;

  try {
    await Service.deleteBrand(brandId);

    return res.json({
      status: true,
    });
  } catch (error) {
    console.log(error.message, "deleteBrand error");
    return res.json({ status: false, message: error.message });
  }
};

const getBrands = async (req, res) => {
  const { limit, skip,isActive } = req.query;
""
  try {
    const brandsQuery = _.omitBy(
      {
        isActive,
      },
      (a) => a === undefined
    );
    let brands = await Service.getBrands(brandsQuery, {
      queryOptions: { limit, skip },
    });

    return res.json({ status: true, ...brands });
  } catch (error) {
    console.log(error.message, "getBrands error");
    return res.json({ status: false, message: error.message });
  }
};

const getBrand = async (req, res) => {
  try {
    const BrandQuery = _.omitBy(
      {
        _id: req.params.brandId,
      },
      (a) => a === undefined
    );

    let brand = await Service.getBrand(BrandQuery);
    return res.json({ status: true, brand });
  } catch (error) {
    console.log(error.message, "getBrand error");
    return res.json({ status: false, message: error.message });
  }
};

export default {
  addBrand,
  updateBrand,
  deleteBrand,
  getBrands,
  getBrand,
};
