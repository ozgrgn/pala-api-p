import Service from "./service.js";
import _ from "lodash";
const addPhase = async (req, res) => {
  const {
   name,
   note,
   isActive,
  } = req.body;

  try {
    let phase = await Service.addPhase(
      name,
      note,
      isActive,
    );
    console.log(phase,"phaseatatat")
    return res.json({
      status: true,
      phase,
    });
  } catch (error) {
    console.log(error.message, "addPhase error");
    
    return res.json({ status: false, message: error.message });
  }
};

const updatePhase = async (req, res) => {
  const { phase } = req.body;
  const { phaseId } = req.params;
  console.log(phase, "sdsfsfsdfsdsf");
  try {
    let updatedPhase = await Service.updatePhase(phaseId, phase);

    return res.json({
      status: true,
      updatedPhase,
    });
  } catch (error) {
    console.log(error.message, "updatePhase error");
    return res.json({ status: false, message: error.message });
  }
};

const deletePhase = async (req, res) => {
  const { phaseId } = req.params;

  try {
    await Service.deletePhase(phaseId);

    return res.json({
      status: true,
    });
  } catch (error) {
    console.log(error.message, "deletePhase error");
    return res.json({ status: false, message: error.message });
  }
};

const getPhases = async (req, res) => {
  const { limit, skip } = req.query;

  try {
    let phases = await Service.getPhases( {
      queryOptions: { limit, skip },
    });

    return res.json({ status: true, ...phases });
  } catch (error) {
    console.log(error.message, "getPhases error");
    return res.json({ status: false, message: error.message });
  }
};

const getPhase = async (req, res) => {
  try {
    const PhaseQuery = _.omitBy(
      {
        _id: req.params.phaseId,
      },
      (a) => a === undefined
    );

    let phase = await Service.getPhase(PhaseQuery);
    return res.json({ status: true, phase });
  } catch (error) {
    console.log(error.message, "getPhase error");
    return res.json({ status: false, message: error.message });
  }
};

export default {
  addPhase,
  updatePhase,
  deletePhase,
  getPhases,
  getPhase,
};
