import mongoose from "mongoose";

const BookingTableSchema = new mongoose.Schema({
  eventId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Event",
    required: true,
  },
  clubId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Club",
    required: true,
  },
  seatCount: {
    type: Number,
    required: true,
    maxLimit: 5,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  status: {
    type: String,
    enum: ["confirmed", "cancelled"],
    default: "confirmed",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

BookingTableSchema.index(
  { eventId: 1, userId: 1 },
  { unique: true, partialFilterExpression: { status: "confirmed" } }
);

const Booking = mongoose.model("Booking", BookingTableSchema);
export default Booking;
