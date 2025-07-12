import Event from "../models/Event.mjs";
import { logger } from "../utils/logger.mjs";

export const createEventService = async (data) => {
  try {
    const newEvent = new Event(data);
    const savedEvent = await newEvent.save();
    return savedEvent;
  } catch (error) {
    logger.error("Create Event Error:", error);
    throw error;
  }
};

export const fetchEventsService = async ({
  name,
  fromDate,
  toDate,
  city,
  page = 1,
  limit = 10,
}) => {
  const skip = (page - 1) * limit;
  const filter = {};

  if (name) {
    filter.eventName = { $regex: name, $options: "i" };
  }

  if (city) {
    filter.city = { $regex: city, $options: "i" };
  }

  if (fromDate && toDate) {
    const from = new Date(fromDate);
    const to = new Date(toDate);
    if (isNaN(from) || isNaN(to) || from > to)
      throw new Error("Invalid date range");
    filter.eventStartDate = { $gte: from };
    filter.eventEndDate = { $lte: to };
  }

  const events = await Event.find(filter)
    .sort({ eventStartDate: 1 })
    .skip(skip)
    .limit(Number(limit));

  const total = await Event.countDocuments(filter);

  return {
    events,
    total,
    totalPages: Math.ceil(total / limit),
    currentPage: Number(page),
  };
};

export const fetchEventByIdService = async (id) => {
  const event = await Event.findById(id);
  if (!event) throw new Error("Event not found");
  return event;
};

export const updateEventService = async (id, data) => {
  const event = await Event.findByIdAndUpdate(id, data, { new: true });
  if (!event) throw new Error("Event not found");
  return event;
};

export const deleteEventService = async (id) => {
  const event = await Event.findByIdAndDelete(id);
  if (!event) throw new Error("Event not found");
  return event;
};

export const fetchEventsByClubIdService = async (query) => {
  const { clubId, name, fromDate, toDate, city, page = 1, limit = 10 } = query;

  const filter = {};

  if (clubId) filter.clubId = clubId;
  if (name) filter.eventName = { $regex: name, $options: "i" };
  if (city) filter.city = { $regex: city, $options: "i" };

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (fromDate && toDate) {
    const from = new Date(fromDate);
    const to = new Date(toDate);
    if (!isNaN(from) && !isNaN(to) && from <= to) {
      filter.eventStartDate = { $gte: from < today ? today : from, $lte: to };
    }
  } else if (fromDate && !toDate) {
    const from = new Date(fromDate);
    if (!isNaN(from)) {
      filter.eventStartDate = { $gte: from < today ? today : from };
    }
  } else {
    filter.eventStartDate = { $gte: today };
  }

  const skip = (Number(page) - 1) * Number(limit);

  const events = await Event.find(filter)
    .sort({ eventStartDate: 1 })
    .skip(skip)
    .limit(Number(limit))
    .lean();

  const total = await Event.countDocuments(filter);

  return {
    events,
    total,
    currentPage: Number(page),
    totalPages: Math.ceil(total / limit),
  };
};

export const fetchEventByClubIdAndEventIdService = async (eventId) => {
  const event = await Event.findById(eventId).lean();

  if (!event) {
    const error = new Error("Event not found");
    error.statusCode = 404;
    throw error;
  }

  return event;
};
