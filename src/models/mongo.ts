import mongoose from "mongoose";
import shortid from "shortid";

const urlschema = new mongoose.Schema({
  _id: { type: String, default: shortid.generate },
  original_url: String,
});

interface typing extends mongoose.Document {
  _id: String;
  original_url: String;
}

export const urlModel = mongoose.model<typing>("URLMODEL", urlschema);
