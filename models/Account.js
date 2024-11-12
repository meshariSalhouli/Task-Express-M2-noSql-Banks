const { model, Schema } = require("mongoose");

const AccountSchema = new Schema({
  username: { type: String, required: true },
  funds: { type: Number },
});

module.exports = model("Account", AccountSchema);
