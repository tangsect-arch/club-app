import request from "supertest";
import app from "../../app.mjs";
import User from "../models/User.mjs";
import Club from "../models/Club.mjs";
import Event from "../models/Event.mjs";
import Booking from "../models/Booking.mjs";

const now = new Date();

export const dbInserts = async () => {
  const userId = "685d3ae2b99c6d851425619d";
  const adminId = "685d3ae2b99c6d851425619c";
  const users = await User.insertMany([
    {
      _id: adminId,
      username: "testadmin",
      password: "$2b$10$2/iipf18qpABNpMNv59lZeobdZWz5CNEeZT5icU135G0wjRXy4uQu",
      role: "admin",
      email: "testadmin@mail.com",
      name: "Test Admin",
    },
    {
      _id: userId,
      username: "testuser",
      password: "$2b$10$2/iipf18qpABNpMNv59lZeobdZWz5CNEeZT5icU135G0wjRXy4uQu",
      role: "user",
      email: "testuser@mail.com",
      name: "Test Admin",
    },
  ]);

  const event = await Club.insertMany([
    {
      _id: "685d3ae2b99c6d85142561a0",
      eventName: "Music Fest " + now.getTime(),
      eventDate: new Date("2026-10-01"),
      location: "Chennai",
      description: "A big music festival",
    },
    {
      _id: "685d3ae2b99c6d85142561a1",
      eventName: "Tech Conference " + (now.getTime() + 1),
      eventDate: new Date("2026-10-01"),
      location: "Bangalore",
      description: "Annual tech meetup",
    },
    {
      _id: "685d3ae2b99c6d85142561a2",
      eventName: "Art Show " + (now.getTime() + 2),
      eventDate: new Date("2026-10-01"),
      location: "Delhi",
      description: "Exhibition of modern art",
    },
    {
      _id: "685d3ae2b99c6d85142561a3",
      eventName: "my new event " + now.getTime(),
      eventDate: new Date("2026-10-01"),
      location: "Hyderabad",
      description: "test description",
    },
  ]);

  const eventId = event[1]._id;

  const eventSeatingId = await ClubEvent.insertMany([
    {
      eventId: event[1]._id,
      seatingName: "VIP Section",
      seatingType: "VIP",
      seatCapacity: 100,
      remainingSeats: 100,
      pricePerSeat: 1500,
    },
    {
      _id: "685d3ae2b99c6d85142561a7",
      eventId: event[1]._id,
      seatingName: "Regular Section",
      seatingType: "Regular",
      seatCapacity: 200,
      pricePerSeat: 1000,
      remainingSeats: 100,
    },
    {
      _id: "685d486f3baa2201b1d4e1b5",
      eventId: event[1]._id,
      seatingName: "Economy Section",
      seatingType: "Economy",
      seatCapacity: 300,
      pricePerSeat: 500,
      remainingSeats: 100,
    },
  ]);

  const eventBookingId = await Booking.insertMany([
    {
      eventId: event[1]._id,
      eventSeatingId: eventSeatingId[1]._id,
      seatCount: 2,
      userId: userId,
      status: "confirmed",
    },
  ]);
};

export const loginAndGetToken = async ({ username, password }) => {
  const res = await request(app)
    .post("/api/v1/auth/login")
    .send({ username, password });
  return await res.body.token;
};

export const eventAndSeating = async ({ username, password }) => {
  const res = await request(app)
    .post("/api/v1/auth/login")
    .send({ username, password });

  return await res.body.token;
};

export const getEventAndBookingIds = async () => {
  const eventBooking = await Booking.findOne({}).sort({ createdAt: -1 }).lean();

  if (!eventBooking) {
    throw new Error("No event booking found in the database");
  }

  const eventId = eventBooking.eventId;
  const eventBookingId = eventBooking._id;

  return { eventId, eventBookingId };
};
