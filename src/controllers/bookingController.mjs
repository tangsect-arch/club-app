import {
  createBookingService,
  fetchBookingsServiceByUserId,
  fetchBookingByIdService,
  updateBookingService,
  cancelBookingService,
} from "../service/bookingService.mjs";

import { successResponse } from "../utils/responseBuilder.mjs";
import { logger } from "../utils/logger.mjs";

export const fetchBookingsByUserId = async (req, res, next) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const result = await fetchBookingsServiceByUserId(
      req.user._id,
      Number(page),
      Number(limit)
    );

    return successResponse({
      res,
      message: "Bookings fetched successfully",
      data: result.bookings,
      meta: {
        currentPage: result.currentPage,
        totalPages: result.totalPages,
        totalRecords: result.totalRecords,
      },
    });
  } catch (error) {
    logger.error(error);
    next(error);
  }
};

export const fetchBookingById = async (req, res, next) => {
  try {
    const booking = await fetchBookingByIdService(req.user._id, req.params.id);
    return successResponse({
      res,
      message: "Booking fetched successfully",
      data: booking,
    });
  } catch (error) {
    logger.error(error);
    next(error);
  }
};

export const createBooking = async (req, res, next) => {
  try {
    const booking = await createBookingService(req.user._id, req.body);
    return successResponse({
      res,
      statusCode: 201,
      message: "Booking created successfully",
      data: booking,
    });
  } catch (error) {
    logger.error(error);
    next(error);
  }
};

export const updateBooking = async (req, res, next) => {
  try {
    const booking = await updateBookingService(
      req.user._id,
      req.params.id,
      req.body.seatCount
    );
    return successResponse({
      res,
      message: "Booking updated successfully",
      data: booking,
    });
  } catch (error) {
    logger.error(error);
    next(error);
  }
};

export const cancelBooking = async (req, res, next) => {
  try {
    const booking = await cancelBookingService(req.user._id, req.params.id);
    return successResponse({
      res,
      message: "Booking cancelled successfully",
      data: booking,
    });
  } catch (error) {
    logger.error(error);
    next(error);
  }
};
