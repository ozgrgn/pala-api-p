import Service from "./service.js";
import _ from "lodash";
const addComp = async (req, res) => {
  const {
   name,
   note,
   isActive,
  } = req.body;

  try {
    let comp = await Service.addComp(
      name,
      note,
      isActive,
    );
    console.log(comp,"compatatat")
    return res.json({
      status: true,
      comp,
    });
  } catch (error) {
    console.log(error.message, "addComp error");
    
    return res.json({ status: false, message: error.message });
  }
};

const updateComp = async (req, res) => {
  const { comp } = req.body;
  const { compId } = req.params;
  console.log(comp, "sdsfsfsdfsdsf");
  try {
    let updatedComp = await Service.updateComp(compId, comp);

    return res.json({
      status: true,
      updatedComp,
    });
  } catch (error) {
    console.log(error.message, "updateComp error");
    return res.json({ status: false, message: error.message });
  }
};

const deleteComp = async (req, res) => {
  const { compId } = req.params;

  try {
    await Service.deleteComp(compId);

    return res.json({
      status: true,
    });
  } catch (error) {
    console.log(error.message, "deleteComp error");
    return res.json({ status: false, message: error.message });
  }
};

const getComps = async (req, res) => {
  const { limit, skip } = req.query;

  try {
    let comps = await Service.getComps( {
      queryOptions: { limit, skip },
    });

    return res.json({ status: true, ...comps });
  } catch (error) {
    console.log(error.message, "getComps error");
    return res.json({ status: false, message: error.message });
  }
};

const getComp = async (req, res) => {
  try {
    const CompQuery = _.omitBy(
      {
        _id: req.params.compId,
      },
      (a) => a === undefined
    );

    let comp = await Service.getComp(CompQuery);
    return res.json({ status: true, comp });
  } catch (error) {
    console.log(error.message, "getComp error");
    return res.json({ status: false, message: error.message });
  }
};

export default {
  addComp,
  updateComp,
  deleteComp,
  getComps,
  getComp,
};
