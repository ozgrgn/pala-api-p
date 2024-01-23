import Service from "./service.js";
import _ from "lodash";
const addMembership = async (req, res) => {
  const {
   name,
   note,
   isActive,
  } = req.body;

  try {
    let membership = await Service.addMembership(
      name,
      note,
      isActive,
    );
    console.log(membership,"membershipatatat")
    return res.json({
      status: true,
      membership,
    });
  } catch (error) {
    console.log(error.message, "addMembership error");
    
    return res.json({ status: false, message: error.message });
  }
};

const updateMembership = async (req, res) => {
  const { membership } = req.body;
  const { membershipId } = req.params;
  console.log(membership, "sdsfsfsdfsdsf");
  try {
    let updatedMembership = await Service.updateMembership(membershipId, membership);

    return res.json({
      status: true,
      updatedMembership,
    });
  } catch (error) {
    console.log(error.message, "updateMembership error");
    return res.json({ status: false, message: error.message });
  }
};

const deleteMembership = async (req, res) => {
  const { membershipId } = req.params;

  try {
    await Service.deleteMembership(membershipId);

    return res.json({
      status: true,
    });
  } catch (error) {
    console.log(error.message, "deleteMembership error");
    return res.json({ status: false, message: error.message });
  }
};

const getMemberships = async (req, res) => {
  const { limit, skip } = req.query;

  try {
    let memberships = await Service.getMemberships( {
      queryOptions: { limit, skip },
    });

    return res.json({ status: true, ...memberships });
  } catch (error) {
    console.log(error.message, "getMemberships error");
    return res.json({ status: false, message: error.message });
  }
};

const getMembership = async (req, res) => {
  try {
    const MembershipQuery = _.omitBy(
      {
        _id: req.params.membershipId,
      },
      (a) => a === undefined
    );

    let membership = await Service.getMembership(MembershipQuery);
    return res.json({ status: true, membership });
  } catch (error) {
    console.log(error.message, "getMembership error");
    return res.json({ status: false, message: error.message });
  }
};

export default {
  addMembership,
  updateMembership,
  deleteMembership,
  getMemberships,
  getMembership,
};
