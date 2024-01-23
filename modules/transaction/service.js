import Mail from "../mail/mail.js";
import Model from "./model.js";
import UserModel from "../user/model.js"
import CustomerModel from "../customer/model.js"
import ProductModel from "../product/model.js"
import mongoose from "mongoose";
import db from "../../db.js"
import moment from "moment";
import emailTransaction from "./emailTransaction.js";
import emailCustomerTransaction from "./emailCustomerTransaction.js";


const getTransactions = async (query = {}, options = {}) => {
  console.log(query, "queryeeee");
  const { queryOptions } = options;

  const transactions = await Model.Transaction.find(query, {}, queryOptions).sort({
    date: -1,
  }).populate("customer").populate("membership");
  const count = await Model.Transaction.countDocuments(query);

  return { transactions, count };
};

const getTransaction = async (query) => {
  return Model.Transaction.findOne(query).populate(["membership", "customer"]);
};

// const addTransaction = async (
//   no,
//   date,
//   phase,
//   customer,
//   customerData,
//   salesItems,
//   total,
//   membership
// ) => {
//   try {
//     return new Model.Transaction({
//       no,
//       date,
//       phase,
//       customer,
//       customerData,
//       salesItems,
//       total,
//       membership
//     }).save();
//   } catch (error) {
//     console.log("addTransaction service error", error);
//     throw new Error(error.message);
//   }
// };

const addTransaction = async (
  no,
  date,
  phase,
  customerId,
  salesItems,
  total,
  kdv
) => {



  let session = await db.startSession()


  try {
    let lastTransaction = await Model.Transaction.findOne().sort({
      no: -1,
    });

    if (!salesItems || salesItems.length < 1) {
      throw new Error("There is no product in sales items")
    }


    let serverTotal = 0
    let customer = await CustomerModel.Customer.findById(customerId)


    if (!customer) {
      throw new Error(
        JSON.stringify({
          en: "Customer is not found.",
          tr: "Customer bulunamadı.",
        })
      );
    }



    let productIds = []
    let productDetailsMap = {}

    salesItems.map(salesItem => {
      productIds = [...productIds, mongoose.Types.ObjectId(salesItem?.product)]

      productDetailsMap[salesItem?.product] = { totalNumber: salesItem?.totalNumber }
    })




    session.startTransaction()

    let user = await UserModel.User.findById(customer?.user, {}, { session }).populate("membership")

    if (!user) {
      throw new Error("User is not found")
    }

    let products = await ProductModel.Product.find({ _id: { $in: productIds } }, {}, { session })

    products.map((product) => {
      serverTotal = serverTotal + productDetailsMap[product?._id.toString()]?.totalNumber * product.prices.find(productPrice => productPrice?._id == user?.membership?._id)?.price
      salesItems.map((salesItem, index) => {
        // salesItems[index].price = product.prices.find(productPrice => productPrice?._id == user?.membership?._id)?.price
      })

    })


    if (Number(serverTotal.toFixed(2)) != total) {


      throw new Error("Total amount could be changed")
    }




    // for (let product of products) {

    //   let totalNumberOfProduct = productDetailsMap[product?._id.toString()]?.totalNumber
    //   if (product.stockCount < totalNumberOfProduct) {
    //     throw new Error("Insufficent stock count")
    //   }

    //   let stockMinusOp = await ProductModel.Product.findOneAndUpdate({ _id: product._id }, { $set: { stockCount: product.stockCount - totalNumberOfProduct } }, { session, new: true })

    //   console.log(stockMinusOp?.stockCount, "updated product")

    // }


    let newTransaction = await new Model.Transaction({
      date,
      no: lastTransaction.no + 1,
      customer: customer._id,
      membership: user?.membership?._id,
      salesItems,
      customerData: customer,
      phase, //stocktaking, order, prepared, cargo, delivered, cancel
      total: serverTotal,
      kdv: kdv,
      isActive: true,
    }).save({ session })


    console.log(newTransaction, "newTransaction")



    await session.commitTransaction()
    await session.endSession()
  } catch (error) {

    console.log("addTransactionByUserId service error", error);
    if (!session.inTransaction()) {
      throw new Error(error.message);
    } else {
      await session.abortTransaction()
      await session.endSession()

      throw new Error(error.message);
    }

  }
};


const addTransactionByUserId = async (
  userId,
  customerId,
  salesItems,
  total,
  kdv
) => {

  let session = await db.startSession()


  try {

    let lastTransaction = await Model.Transaction.findOne().sort({
      no: -1,
    });
    if (!lastTransaction) {
      lastTransaction = {}
      lastTransaction.no = 0
    }

    let serverTotal = 0
    let customer = await CustomerModel.Customer.findById(customerId)


    if (!customer) {
      throw new Error(
        JSON.stringify({
          en: "Customer is not found.",
          tr: "Firma bulunamadı.",
        })
      );
    }



    let productIds = []
    let productDetailsMap = {}

    salesItems.map(salesItem => {
      productIds = [...productIds, mongoose.Types.ObjectId(salesItem?.product)]

      productDetailsMap[salesItem?.product] = { totalNumber: salesItem?.totalNumber }
    })




    session.startTransaction()

    let user = await UserModel.User.findById(userId, {}, { session }).populate("membership")

    if (!user) {
      throw new Error("User is not found")
    }

    let products = await ProductModel.Product.find({ _id: { $in: productIds } }, {}, { session })

    products.map((product) => {
      serverTotal = serverTotal + productDetailsMap[product?._id.toString()]?.totalNumber * product.prices.find(productPrice => productPrice?._id == user?.membership?._id)?.price
      salesItems.map((salesItem, index) => {
        console.log(salesItem, "tek tek salesItem")

        // salesItems[index].price = product.prices.find(productPrice => productPrice?._id == user?.membership?._id)?.price
      })
    })

    if (Number(serverTotal.toFixed(2)) != total) {
      throw new Error("Total amount could be changed")
    }


    // for (let product of products) {

    //   let totalNumberOfProduct = productDetailsMap[product?._id.toString()]?.totalNumber
    //   if (product.stockCount < totalNumberOfProduct) {
    //     throw new Error("Insufficent stock count")
    //   }

    //   let stockMinusOp = await ProductModel.Product.findOneAndUpdate({ _id: product._id }, { $set: { stockCount: product.stockCount - totalNumberOfProduct } }, { session, new: true })

    //   console.log(stockMinusOp?.stockCount, "updated product")

    // }

    await Mail.sendMail(

      user.email,
      "Yeni Sipariş Talebi",
      undefined,
      emailCustomerTransaction(
        lastTransaction.no + 1
      )

    )

    await Mail.sendMail(

      "admin@palaexport.de",
      "Yeni Satış",
      undefined,
      emailTransaction(
        customer.name,
        customer.phone,
        moment().format("DD/MM/YYYY,HH:MM"),
        Number(total).toFixed(2),
        Number(kdv).toFixed(2),
        Number((Number(total) + Number(kdv))).toFixed(2),
        lastTransaction.no + 1
      )

    )

    let newTransaction = await new Model.Transaction({
      no: lastTransaction.no + 1,
      date: moment().toDate(),
      customer: customer._id,
      membership: user?.membership?._id,
      salesItems,
      customerData: customer,
      phase: "order", //stocktaking, order, prepared, cargo, delivered, cancel
      total: serverTotal,
      kdv,
      isActive: true,
    }).save({ session })





    await session.commitTransaction()
    await session.endSession()
  } catch (error) {

    console.log("addTransactionByUserId service error", error);
    if (!session.inTransaction()) {
      throw new Error(error.message);
    } else {
      await session.abortTransaction()
      await session.endSession()

      throw new Error(error.message);
    }

  }
};

const updateTransaction = async (transactionId, transaction) => {
  try {
    let isExistTransaction = await Model.Transaction.findById(transactionId);

    if (!isExistTransaction) {
      throw new Error(
        JSON.stringify({
          en: "Transaction is not found.",
          tr: "Transaction bulunamadı.",
        })
      );
    }

    return Model.Transaction.findOneAndUpdate(
      { _id: isExistTransaction._id },
      { ...transaction },
      { new: true }
    );
  } catch (error) {
    console.log("updateTransaction service error", error);
    throw new Error(error.message);
  }
};

const deleteTransaction = async (transactionId) => {

  try {
    return Model.Transaction.deleteOne({ _id: transactionId });
  } catch (error) {
    console.log("deleteTransaction service error", error);
    throw new Error(error.message);
  }
};

// let session = await db.startSession()

// try {


//   session.startTransaction()

//   let transaction = await Model.Transaction.findById(transactionId, {}, { session })
//   if (!transaction) {
//     throw new Error("Transaction not found")
//   }


//   if (transaction?.phase == 'cancel') {
//     throw new Error("Transaction already canceled")
//   }
//   for (let salesItem of transaction.salesItems) {
//     let stockMinusOp = await ProductModel.Product.findOneAndUpdate({ _id: mongoose.Types.ObjectId(salesItem?.product) }, { $inc: { stockCount: salesItem?.totalNumber } }, { session, new: true })

//     console.log(stockMinusOp?.stockCount, "updated product")

//   }


//   await Model.Transaction.findOneAndUpdate({ _id: transactionId }, { $set: { phase: 'cancel' } }, { session });

//   await session.commitTransaction()
//   await session.endSession()
// } catch (error) {
//   console.log("deleteTransaction service error", error);
//   if (!session.inTransaction()) {
//     throw new Error(error.message);
//   } else {
//     await session.abortTransaction()
//     await session.endSession()

//     throw new Error(error.message);
//   }
// }
// };


const getTransactionsByUserId = async (query = {}, options = {}) => {
  console.log(query, "queryeeee");

  let customers = await CustomerModel.Customer.find(query)
  let customersIds = []
  customers.map((customer, i) => {
    customersIds = [...customersIds, customer._id,]
  })
  const transactions = await Model.Transaction.find(({ customer: { $in: customersIds } })).sort({
    date: -1,
  }).populate("customer").populate("membership");
  return { transactions };
};


export default {
  addTransaction,
  updateTransaction,
  deleteTransaction,
  getTransactions,
  getTransaction,
  addTransactionByUserId,
  getTransactionsByUserId
};
