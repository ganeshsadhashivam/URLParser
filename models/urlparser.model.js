const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const URLSchema = new Schema(
  {
    URL: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

URLSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const URLSchemaParser = mongoose.model("URL", URLSchema);

module.exports = URLSchemaParser;
