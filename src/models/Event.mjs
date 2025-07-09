import mongoose from "mongoose";

const EventTableSchema = new mongoose.Schema({
  eventName: {
    type: String,
    required: true,
    trim: true,
  },
  eventStartDate: {
    type: Date,
    required: true,
  },
  eventEndDate: {
    type: Date,
    required: true,
    validate: {
      validator: function (v) {
        return v > this.eventStartDate;
      },
      message: "Event end date must be after the start date.",
    },
  },
  address: {
    type: String,
    required: true,
    trim: true,
  },
  city: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  seatCount: {
    type: Number,
    required: true,
    min: 1,
  },
  amountPerSeat: {
    type: Number,
    required: true,
    min: 0,
  },
  maxBookingPerUser: {
    type: Number,
    required: true,
    min: 1,
  },
  clubId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Club",
    required: true,
  },
  status: {
    type: String,
    enum: ["active", "inactive"],
    default: "active",
  },
});

EventTableSchema.pre("save", async function (next) {
  const Event = this.constructor;

  if (this.eventStartDate >= this.eventEndDate) {
    return next(new Error("eventEndDate must be after eventStartDate"));
  }

  const overlapping = await Event.findOne({
    _id: { $ne: this._id },
    organizer: this.organizer,
    city: this.city,
    eventStartDate: { $lte: this.eventEndDate },
    eventEndDate: { $gte: this.eventStartDate },
  });

  if (overlapping) {
    return next(
      new Error(
        `Overlapping event "${overlapping.eventName}" found for the same organizer and location`
      )
    );
  }
  next();
});

const Event = mongoose.model("Event", EventTableSchema);
export default Event;
