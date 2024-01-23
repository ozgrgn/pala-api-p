import Model from "./model.js";
import Mail from "../mail/mail.js";
import emailNewCustomer from "./emailNewCustomer.js";
import TransactionModel from "../transaction/model.js";

import moment from "moment";

// const getCustomers = async (query = {}, options = {}) => {
//   console.log(query, "query");
//   const { queryOptions } = options;

//   const customers = await Model.Customer.find(query, {}, queryOptions).sort({
//     name: 1,
//   }).populate("user");
//   const count = await Model.Customer.countDocuments(query);

//   return { customers, count };
// };
const getCustomers = async (query = {}, options = {}) => {
  const { queryOptions } = options;
  console.log(options, "options");
  let customers = await Model.Customer.aggregate(
    [
      {
        $match: query,
      },

      {
        $lookup: {
          from: "customers",
          localField: "customer",
          foreignField: "_id",
          as: "customer",
        },
      },
      {
        $unwind: { path: "$customer", preserveNullAndEmptyArrays: true },
      },
      {
        $lookup: {
          from: "users",
          localField: "user",
          foreignField: "_id",
          as: "user",
        },
      },

      {
        $unwind: { path: "$user", preserveNullAndEmptyArrays: true },
      },
      {
        $sort: queryOptions.order ? queryOptions.order : { name: -1 },
      },
      { $skip: queryOptions.skip ? queryOptions.skip : 0 },
      { $limit: queryOptions.limit?queryOptions.limit:99999999 },
    ],
    { collation: { locale: "en" } }
  );

  const count = await Model.Customer.countDocuments(query);
  return { customers, count };
};

const getCustomer = async (query) => {
  return Model.Customer.findOne(query).sort({ name: -1 });
};

const addCustomer = async (
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
) => {
  try {
    await Mail.sendMail(
      "admin@palaexport.de",
      "Yeni Kullanıcı Kaydı",
      undefined,
      emailNewCustomer(
        moment().format("DD/MM/YYYY,HH:MM"),
        name,
        person,
        phone,
        email,
        country,
        city
      )
    );
    return new Model.Customer({
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
    }).save();
  } catch (error) {
    console.log("addCustomer service error", error);
    throw new Error(error.message);
  }
};

const updateCustomer = async (customerId, customer) => {
  try {
    let isExistCustomer = await Model.Customer.findById(customerId);

    if (!isExistCustomer) {
      throw new Error(
        JSON.stringify({
          en: "Customer is not found.",
          tr: "Customer bulunamadı.",
        })
      );
    }

    return Model.Customer.findOneAndUpdate(
      { _id: isExistCustomer._id },
      { ...customer },
      { new: true }
    );
  } catch (error) {
    console.log("updateCustomer service error", error);
    throw new Error(error.message);
  }
};

const deleteCustomer = async (customerId) => {
  try {
    let isExistTransactionByCustomer =
      await TransactionModel.Transaction.findOne({ customer: customerId });
    if (isExistTransactionByCustomer) {
      console.log(isExistTransactionByCustomer);
      throw new Error(
        JSON.stringify({
          tr: "Bu Firmaya ait satış kaydı var. Firmayı silmek için önce satış kaydını silmelisiniz.",
          en: "Bu Firmaya ait satış kaydı var. Firmayı silmek için önce satış kaydını silmelisiniz.",
        })
      );
    }
    return Model.Customer.deleteOne({ _id: customerId });
  } catch (error) {
    console.log("deleteCustomer service error", error);
    throw new Error(error.message);
  }
};

export default {
  addCustomer,
  updateCustomer,
  deleteCustomer,
  getCustomers,
  getCustomer,
};
