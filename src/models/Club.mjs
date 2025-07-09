import mongoose from "mongoose";

const ClubTableSchema = new mongoose.Schema({
  clubName: {
    type: String,
    required: true,
    trim: true,
  },
  clubType: {
    type: String,
    required: true,
    enum: ["sports", "cultural", "academic", "social"],
    default: "social",
  },
  contactNumber: {
    type: String,
    required: true,
    trim: true,
    validate: {
      validator: function (v) {
        return /\d{10}/.test(v);
      },
      message: (props) => `${props.value} is not a valid phone number!`,
    },
  },
  email: {
    type: String,
    required: true,
    trim: true,
    validate: {
      validator: function (v) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
      },
      message: (props) => `${props.value} is not a valid email address!`,
    },
  },
  addressLine1: {
    type: String,
    required: true,
    trim: true,
  },
  addressLine2: {
    type: String,
    trim: true,
  },
  city: {
    type: String,
    required: true,
    trim: true,
  },
  state: {
    type: String,
    required: true,
    trim: true,
  },
  country: {
    type: String,
    required: true,
    trim: true,
  },
  postalCode: {
    type: String,
    required: true,
    trim: true,
    validate: {
      validator: function (v) {
        return /\d{5}(-\d{4})?/.test(v);
      },
      message: (props) => `${props.value} is not a valid postal code!`,
    },
  },
  status: {
    type: String,
    required: true,
    enum: ["pending", "active", "inactive", "suspended"],
    default: "pending",
  },
  description: {
    type: String,
    trim: true,
  },
  website: {
    type: String,
    trim: true,
    validate: {
      validator: function (v) {
        return /^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w- ./?%&=]*)?$/.test(v);
      },
      message: (props) => `${props.value} is not a valid URL!`,
    },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  clubAdmin: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  parentClub: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Club",
  },
});

ClubTableSchema.index({ clubName: 1, city: 1 }, { unique: true });
const Club = mongoose.model("Club", ClubTableSchema);
export default Club;
