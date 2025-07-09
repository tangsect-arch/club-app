import Club from "../models/Club.mjs";
import Event from "../models/Event.mjs";
import Booking from "../models/Booking.mjs";
import User from "../models/User.mjs";

export const fetchBookings = async (req, res) => {
  try {
    const userId = req.user._id;
    const bookings = await Booking.find({ userId })
      .populate("eventId", "eventName eventDate location")
      .populate("eventSeatingId", "seatCount");

    if (!bookings || bookings.length === 0) {
      return res.status(404).json({
        success: false,
        bookings: [],
        message: "No bookings found for this user",
      });
    }

    res.status(200).json({
      success: true,
      bookings,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const fetchBookingById = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;
    const booking = await Booking.find({ _id: id, userId })
      .populate("eventId", "eventName eventDate location")
      .populate("eventSeatingId", "seatCount");

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    res.status(200).json({
      success: true,
      booking,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const createBooking = async (req, res) => {
  try {
    const { eventId, eventSeatingId, seatCount } = req.body;
    const userId = req.user._id;

    const booking = new Booking({
      eventId,
      eventSeatingId,
      seatCount,
      userId,
    });

    await booking.save();

    res.status(201).json({
      success: true,
      message: "Booking created successfully",
      booking,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const updateBooking = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;
    const { seatCount } = req.body;

    const booking = await Booking.findOneAndUpdate(
      { _id: id, userId },
      { seatCount },
      { new: true }
    );
    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Booking updated successfully",
      booking,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const cancelBooking = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;

    const booking = await Booking.findOneAndUpdate(
      { _id: id, userId },
      { status: "inactive" },
      { new: true }
    );

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Booking cancelled successfully",
      booking,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
