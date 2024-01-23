import Service from "./service.js";
import mongoose from "mongoose";

import _ from "lodash";
const addTransaction = async (req, res) => {
  const {
    no,
    date,
    phase,
    customer,
    salesItems,
    total,
    kdv
  } = req.body;

  
  try {
    let transaction = await Service.addTransaction(
      no,
      date,
      phase,
      customer,
      salesItems,
      total,
      kdv
    );

    return res.json({
      status: true,
      transaction,
    });
  } catch (error) {
    console.log(error.message, "addTransaction error");
    return res.json({ status: false, message: error.message });
  }
};

const addTransactionByUserId = async (req, res) => {
  const { userId } = req.user
  const {
    customerId,
    salesItems,
    total,
    kdv
  } = req.body;

  try {
    let transaction = await Service.addTransactionByUserId(
      userId,
      customerId,
      salesItems,
      total,
      kdv
    );

    return res.json({
      status: true,
      transaction,
    });
  } catch (error) {
    console.log(error.message, "addTransactionByUserId error");
    return res.json({ status: false, message: error.message });
  }
};

const updateTransaction = async (req, res) => {
  const { transaction } = req.body;
  const { transactionId } = req.params;
  console.log(transaction, "sdsfsfsdfsdsf");
  try {
    let updatedTransaction = await Service.updateTransaction(transactionId, transaction);

    return res.json({
      status: true,
      updatedTransaction,
    });
  } catch (error) {
    console.log(error.message, "updateTransaction error");
    return res.json({ status: false, message: error.message });
  }
};

const deleteTransaction = async (req, res) => {
  const { transactionId } = req.params;

  try {
    await Service.deleteTransaction(transactionId);

    return res.json({
      status: true,
    });
  } catch (error) {
    console.log(error.message, "deleteTransaction error");
    return res.json({ status: false, message: error.message });
  }
};

const getTransactions = async (req, res) => {
  const { limit, skip, lang } = req.query;

  try {
    const transactionsQuery = _.omitBy(
      {
        lang,
      },
      (a) => a === undefined
    );
    let transactions = await Service.getTransactions(transactionsQuery, {
      queryOptions: { limit, skip },
    });

    return res.json({ status: true, ...transactions });
  } catch (error) {
    console.log(error.message, "getTransactions error");
    return res.json({ status: false, message: error.message });
  }
};

const getTransaction = async (req, res) => {
  try {
    const TransactionQuery = _.omitBy(
      {
        _id: req.params.transactionId,
      },
      (a) => a === undefined
    );

    let transaction = await Service.getTransaction(TransactionQuery);
    return res.json({ status: true, transaction });
  } catch (error) {
    console.log(error.message, "getTransaction error");
    return res.json({ status: false, message: error.message });
  }
};

const getTransactionsByUserId = async (req, res) => {

  const { userId } = req.user
  try {
    const transactionsQuery = _.omitBy(
      {
        user: userId ? mongoose.Types.ObjectId(userId) : undefined,
      },
      (a) => a === undefined
    );
    let transactions = await Service.getTransactionsByUserId(transactionsQuery, {
      queryOptions: {},
    });

    return res.json({ status: true, ...transactions });
  } catch (error) {
    console.log(error.message, "getTransactions error");
    return res.json({ status: false, message: error.message });
  }

}
export default {
  addTransaction,
  addTransactionByUserId,
  updateTransaction,
  deleteTransaction,
  getTransactions,
  getTransaction,
  getTransactionsByUserId
};
