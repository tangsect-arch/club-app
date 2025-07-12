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
  startTime: {
    type: String, // Format: HH:mm
    required: true,
    validate: {
      validator: (v) => /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/.test(v),
      message: "Start time must be in HH:mm format",
    },
  },
  duration: {
    type: Number, // In hours
    required: true,
    min: [4, "Duration must be at least 4 hour"],
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
  availableSeats: {
    type: Number,
    required: true,
    min: 1,
  },
  bookedSeats: {
    type: Number,
    required: true,
    default: 0,
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

// Validation before saving
EventTableSchema.pre("save", async function (next) {
  const Event = this.constructor;

  if (this.eventStartDate >= this.eventEndDate) {
    return next(new Error("eventEndDate must be after eventStartDate"));
  }

  const overlapping = await Event.findOne({
    _id: { $ne: this._id },
    city: this.city,
    clubId: this.clubId,
    status: "active",
    eventStartDate: { $lte: this.eventEndDate },
    eventEndDate: { $gte: this.eventStartDate },
  });

  if (overlapping) {
    return next(
      new Error(
        `Overlapping event "${overlapping.eventName}" found in the same city and time range`
      )
    );
  }

  next();
});

// Virtual: end time calculation
EventTableSchema.virtual("endTime").get(function () {
  if (!this.startTime || !this.duration) return null;

  const [hours, minutes] = this.startTime.split(":").map(Number);
  const startDateTime = new Date(this.eventStartDate);
  startDateTime.setHours(hours, minutes, 0, 0);

  const endDateTime = new Date(
    startDateTime.getTime() + this.duration * 60 * 60 * 1000
  );

  const hh = String(endDateTime.getHours()).padStart(2, "0");
  const mm = String(endDateTime.getMinutes()).padStart(2, "0");

  return `${hh}:${mm}`;
});

EventTableSchema.set("toJSON", { virtuals: true });
EventTableSchema.set("toObject", { virtuals: true });

const Event = mongoose.model("Event", EventTableSchema);
export default Event;
