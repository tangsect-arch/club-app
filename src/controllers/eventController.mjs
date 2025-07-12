import {
  createEventService,
  fetchEventsService,
  fetchEventByIdService,
  updateEventService,
  deleteEventService,
} from "../service/eventService.mjs";

import { successResponse } from "../utils/responseBuilder.mjs";
import { logger } from "../utils/logger.mjs";

export const createEvent = async (req, res, next) => {
  try {
    const event = await createEventService(req.body);
    return successResponse({
      res,
      message: "Event created successfully",
      data: event,
      statusCode: 201,
    });
  } catch (error) {
    logger.error(error);
    next(error);
  }
};

export const fetchEvents = async (req, res, next) => {
  try {
    const result = await fetchEventsService(req.query);
    return successResponse({
      res,
      message: "Events fetched successfully",
      data: result.events,
      meta: {
        totalPages: result.totalPages,
        currentPage: result.currentPage,
        totalRecords: result.total,
      },
    });
  } catch (error) {
    logger.error(error);
    next(error);
  }
};

export const fetchEventById = async (req, res, next) => {
  try {
    const event = await fetchEventByIdService(req.params.id);
    return successResponse({
      res,
      message: "Event fetched successfully",
      data: event,
    });
  } catch (error) {
    logger.error(error);
    next(error);
  }
};

export const fetchEventsByClubId = async (req, res, next) => {
  try {
    const result = await fetchEventsService(req.query);
    return successResponse({
      res,
      message: "Events fetched successfully",
      data: result.events,
      meta: {
        totalPages: result.totalPages,
        currentPage: result.currentPage,
        totalRecords: result.total,
      },
    });
  } catch (error) {
    logger.error(error);
    next(error);
  }
};

export const fetchEventByClubIdAndEventId = async (req, res, next) => {
  try {
    const event = await fetchEventByIdService(req.params.id);
    return successResponse({
      res,
      message: "Event fetched successfully",
      data: event,
    });
  } catch (error) {
    logger.error(error);
    next(error);
  }
};

export const updateEvent = async (req, res, next) => {
  try {
    const event = await updateEventService(req.params.id, req.body);
    return successResponse({
      res,
      message: "Event updated successfully",
      data: event,
    });
  } catch (error) {
    logger.error(error);
    next(error);
  }
};

export const deleteEvent = async (req, res, next) => {
  try {
    const event = await deleteEventService(req.params.id);
    return successResponse({
      res,
      message: "Event deleted successfully",
      data: event,
    });
  } catch (error) {
    logger.error(error);
    next(error);
  }
};
