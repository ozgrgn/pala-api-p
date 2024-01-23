import Service from "./service.js";
import _ from "lodash";
const addUnit = async (req, res) => {
  const {
   name,
   note,
   isActive,
  } = req.body;

  try {
    let unit = await Service.addUnit(
      name,
      note,
      isActive,
    );
    console.log(unit,"unitatatat")
    return res.json({
      status: true,
      unit,
    });
  } catch (error) {
    console.log(error.message, "addUnit error");
    
    return res.json({ status: false, message: error.message });
  }
};

const updateUnit = async (req, res) => {
  const { unit } = req.body;
  const { unitId } = req.params;
  console.log(unit, "sdsfsfsdfsdsf");
  try {
    let updatedUnit = await Service.updateUnit(unitId, unit);

    return res.json({
      status: true,
      updatedUnit,
    });
  } catch (error) {
    console.log(error.message, "updateUnit error");
    return res.json({ status: false, message: error.message });
  }
};

const deleteUnit = async (req, res) => {
  const { unitId } = req.params;

  try {
    await Service.deleteUnit(unitId);

    return res.json({
      status: true,
    });
  } catch (error) {
    console.log(error.message, "deleteUnit error");
    return res.json({ status: false, message: error.message });
  }
};

const getUnits = async (req, res) => {
  const { limit, skip } = req.query;

  try {
    let units = await Service.getUnits( {
      queryOptions: { limit, skip },
    });

    return res.json({ status: true, ...units });
  } catch (error) {
    console.log(error.message, "getUnits error");
    return res.json({ status: false, message: error.message });
  }
};

const getUnit = async (req, res) => {
  try {
    const UnitQuery = _.omitBy(
      {
        _id: req.params.unitId,
      },
      (a) => a === undefined
    );

    let unit = await Service.getUnit(UnitQuery);
    return res.json({ status: true, unit });
  } catch (error) {
    console.log(error.message, "getUnit error");
    return res.json({ status: false, message: error.message });
  }
};

export default {
  addUnit,
  updateUnit,
  deleteUnit,
  getUnits,
  getUnit,
};
