import mongoose from "mongoose";
const Schema = mongoose.Schema;

const settingsSchema = new Schema({
  isOwner: Boolean,
  ownerEmail: {
    type: String,
    lowercase: true,
    trim: true,
    required: true,
  },
  currency: {
    default: "dolar",
    type: String,
  },
  currencyCode: String,
  emailNotifications: {
    type: Boolean,
    default: false,
  },
});
const SettingsModel = mongoose.model("settings", settingsSchema);
export default SettingsModel;
