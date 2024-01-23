import Service from "./service.js";
import _ from "lodash";
import mongoose from "mongoose";
const addCustomer = async (req, res) => {
  const {
    no,
    name,
    surname,
    country,
    street,
    post,
    city,
    person,
    phone,
    mobile,
    email,
    note,
    basket,
    other,
    isActive,
    status,
    images,
    user,
  } = req.body;

  try {
    let customer = await Service.addCustomer(
      no,
      name,
      surname,
      country,
      street,
      post,
      city,
      person,
      phone,
      mobile,
      email,
      note,
      basket,
      other,
      isActive,
      status,
      images,
      user
    );

    return res.json({
      status: true,
      customer,
    });
  } catch (error) {
    console.log(error.message, "addCustomer error");
    return res.json({ status: false, message: error.message });
  }
};

const updateCustomer = async (req, res) => {
  const { customer } = req.body;
  const { customerId } = req.params;
  console.log(customer, "sdsfsfsdfsdsf");
  try {
    let updatedCustomer = await Service.updateCustomer(customerId, customer);

    return res.json({
      status: true,
      updatedCustomer,
    });
  } catch (error) {
    console.log(error.message, "updateCustomer error");
    return res.json({ status: false, message: error.message });
  }
};

const deleteCustomer = async (req, res) => {
  const { customerId } = req.params;

  try {
    await Service.deleteCustomer(customerId);

    return res.json({
      status: true,
    });
  } catch (error) {
    console.log(error.message, "deleteCustomer error");
    return res.json({ status: false, message: error.message });
  }
};

const getCustomers = async (req, res) => {
  const { limit, skip, isActive, search, sortValue } = req.query;

  try {
    const customersQuery = _.omitBy(
      {
        isActive,
      },
      (a) => a === undefined
    );
    if (search) {
      customersQuery.$or = [
        { name: { $regex: RegExp(search + ".*", "i") } },
        { no: { $regex: RegExp(search + ".*", "i") } },
      ];
    }
    let order =
      sortValue == "name"
        ? { name: 1 }
        : sortValue == "username"
        ? { "user.fullName": 1 }
        : sortValue == "status"
        ? { status: 1 }
        : { _id: -1 };
    console.log(customersQuery, "seseses");

    let customers = await Service.getCustomers(customersQuery, {
      queryOptions: { limit, skip, order },
    });

    return res.json({ status: true, ...customers });
  } catch (error) {
    console.log(error.message, "getCustomers error");
    return res.json({ status: false, message: error.message });
  }
};

const getCustomersByUserId = async (req, res) => {
  const { userId } = req.user;
  try {
    const customersQuery = _.omitBy(
      {
        user: userId ? mongoose.Types.ObjectId(userId) : undefined,
      },
      (a) => a === undefined
    );
    let customers = await Service.getCustomers(customersQuery, {
      queryOptions: {},
    });

    return res.json({ status: true, ...customers });
  } catch (error) {
    console.log(error.message, "getCustomers error");
    return res.json({ status: false, message: error.message });
  }
};

const getCustomer = async (req, res) => {
  try {
    const CustomerQuery = _.omitBy(
      {
        _id: req.params.customerId,
      },
      (a) => a === undefined
    );

    let customer = await Service.getCustomer(CustomerQuery);
    return res.json({ status: true, customer });
  } catch (error) {
    console.log(error.message, "getCustomer error");
    return res.json({ status: false, message: error.message });
  }
};

export default {
  addCustomer,
  updateCustomer,
  deleteCustomer,
  getCustomers,
  getCustomersByUserId,
  getCustomer,
};
