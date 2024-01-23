import Service from "./service.js";
import _ from "lodash";
const addContact = async (req, res) => {
  const {
    lang,
    header,
    text,
    spot,
    title,
    description,
  } = req.body;

  try {
    let contact = await Service.addContact(
      lang,
      header,
      text,
      spot,
      title,
      description,
    );

    return res.json({
      status: true,
      contact,
    });
  } catch (error) {
    console.log(error.message, "addContact error");
    return res.json({ status: false, message: error.message });
  }
};

const updateContact = async (req, res) => {
  const { contact } = req.body;
  const { contactId } = req.params;
  console.log(contact, "sdsfsfsdfsdsf");
  try {
    let updatedContact = await Service.updateContact(contactId, contact);

    return res.json({
      status: true,
      updatedContact,
    });
  } catch (error) {
    console.log(error.message, "updateContact error");
    return res.json({ status: false, message: error.message });
  }
};

const deleteContact = async (req, res) => {
  const { contactId } = req.params;

  try {
    await Service.deleteContact(contactId);

    return res.json({
      status: true,
    });
  } catch (error) {
    console.log(error.message, "deleteContact error");
    return res.json({ status: false, message: error.message });
  }
};

const getContacts = async (req, res) => {
  const { limit, skip, lang } = req.query;

  try {
    const contactsQuery = _.omitBy(
      {
        lang,
      },
      (a) => a === undefined
    );
    let contacts = await Service.getContacts(contactsQuery, {
      queryOptions: { limit, skip },
    });

    return res.json({ status: true, ...contacts });
  } catch (error) {
    console.log(error.message, "getContacts error");
    return res.json({ status: false, message: error.message });
  }
};

const getContact = async (req, res) => {
  try {
    const ContactQuery = _.omitBy(
      {
        _id: req.params.contactId,
      },
      (a) => a === undefined
    );

    let contact = await Service.getContact(ContactQuery);
    return res.json({ status: true, contact });
  } catch (error) {
    console.log(error.message, "getContact error");
    return res.json({ status: false, message: error.message });
  }
};

export default {
  addContact,
  updateContact,
  deleteContact,
  getContacts,
  getContact,
};
