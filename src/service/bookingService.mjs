import Booking from "../models/Booking.mjs";
import Event from "../models/Event.mjs";

export const fetchBookingsService = async (userId, page = 1, limit = 10) => {
  const skip = (page - 1) * limit;
  const bookings = await Booking.find({ userId })
    .skip(skip)
    .limit(limit)
    .populate("eventId", "eventName eventStartDate city")
    .populate("clubId", "clubName")
    .lean();

  const total = await Booking.countDocuments({ userId });

  return {
    data: bookings,
    total,
    currentPage: Number(page),
    totalPages: Math.ceil(total / limit),
  };
};

export const fetchBookingByIdService = async (userId, bookingId) => {
  const booking = await Booking.findOne({ _id: bookingId, userId })
    .populate("eventId", "eventName eventStartDate city")
    .populate("clubId", "clubName")
    .lean();

  if (!booking) {
    const error = new Error("Booking not found");
    error.statusCode = 404;
    throw error;
  }

  return booking;
};

export const createBookingService = async (userId, body) => {
  const { eventId, seatCount, clubId } = body;
  const event = await Event.findById(eventId);

  if (!event) {
    const error = new Error("Event not found");
    error.statusCode = 404;
    throw error;
  }

  if (seatCount > event.availableSeats) {
    const error = new Error("Not enough available seats for this event");
    error.statusCode = 400;
    throw error;
  }

  const newBooking = new Booking({
    eventId,
    clubId,
    seatCount,
    userId,
  });

  await newBooking.save();

  event.availableSeats -= seatCount;
  event.bookedSeats += seatCount;
  await event.save();

  return newBooking;
};

export const updateBookingService = async (userId, bookingId, seatCount) => {
  const booking = await Booking.findOne({ _id: bookingId, userId });
  if (!booking) {
    const error = new Error("Booking not found");
    error.statusCode = 404;
    throw error;
  }

  const event = await Event.findById(booking.eventId);
  if (!event) {
    const error = new Error("Associated event not found");
    error.statusCode = 404;
    throw error;
  }

  const diff = seatCount - booking.seatCount;

  if (diff > 0 && diff > event.availableSeats) {
    const error = new Error("Not enough available seats for this update");
    error.statusCode = 400;
    throw error;
  }

  booking.seatCount = seatCount;
  await booking.save();

  event.availableSeats -= diff;
  event.bookedSeats += diff;
  await event.save();

  return booking;
};

export const cancelBookingService = async (userId, bookingId) => {
  const booking = await Booking.findOne({ _id: bookingId, userId });
  if (!booking) {
    const error = new Error("Booking not found");
    error.statusCode = 404;
    throw error;
  }

  const event = await Event.findById(booking.eventId);
  if (!event) {
    const error = new Error("Associated event not found");
    error.statusCode = 404;
    throw error;
  }

  if (booking.status === "cancelled") {
    const error = new Error("Booking is already cancelled");
    error.statusCode = 400;
    throw error;
  }

  booking.status = "cancelled";
  await booking.save();

  event.availableSeats += booking.seatCount;
  event.bookedSeats -= booking.seatCount;
  await event.save();

  return booking;
};
