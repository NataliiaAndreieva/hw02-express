const { HttpError } = require("../../helpers");
const { Contact } = require("../../models/contact");

const removeContact = async (req, res, _) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndRemove(contactId);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json({
    message: "contact deleted",
  });
};

module.exports = removeContact;
