import Model from "./model.js";

const getContacts = async (query = {}, options = {}) => {
  console.log(query, "query");
  const { queryOptions } = options;

  const contacts = await Model.Contact.find(query, {}, queryOptions).sort({
    order: 1,
  });
  const count = await Model.Contact.countDocuments(query);

  return { contacts, count };
};

const getContact = async (query) => {
  return Model.Contact.findOne(query);
};

const addContact = async (
  lang,
  header,
  text,
  spot,
  title,
  description,
) => {
  try {
    return new Model.Contact({
      lang,
      header,
      text,
      spot,
      title,
      description,
    }).save();
  } catch (error) {
    console.log("addContact service error", error);
    throw new Error(error.message);
  }
};

const updateContact = async (contactId, contact) => {
  try {
    let isExistContact = await Model.Contact.findById(contactId);

    if (!isExistContact) {
      throw new Error(
        JSON.stringify({
          en: "Contact is not found.",
          tr: "Contact bulunamadı.",
        })
      );
    }

    return Model.Contact.findOneAndUpdate(
      { _id: isExistContact._id },
      { ...contact },
      { new: true }
    );
  } catch (error) {
    console.log("updateContact service error", error);
    throw new Error(error.message);
  }
};

const deleteContact = async (contactId) => {
  try {
    return Model.Contact.deleteOne({ _id: contactId });
  } catch (error) {
    console.log("deleteContact service error", error);
    throw new Error(error.message);
  }
};

export default {
  addContact,
  updateContact,
  deleteContact,
  getContacts,
  getContact,
};
