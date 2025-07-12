import mongoose from "mongoose";
import bcrypt from "bcrypt";

import request from "supertest";
import app from "../../app.mjs";
import User from "../models/User.mjs";
import Club from "../models/Club.mjs";
import Event from "../models/Event.mjs";
import Booking from "../models/Booking.mjs";

const now = new Date();

const hashedPassword =
  "$2b$10$2/iipf18qpABNpMNv59lZeobdZWz5CNEeZT5icU135G0wjRXy4uQu";

export const dbInserts = async () => {
  const password = hashedPassword;
  const superAdminId = new mongoose.Types.ObjectId();
  const clubAdminId = new mongoose.Types.ObjectId();
  const userId = new mongoose.Types.ObjectId();

  const userInsert = await User.insertMany([
    {
      _id: superAdminId,
      username: "dummysuperadmin",
      email: "dummysuperadmin@mail.com",
      password,
      name: "Super Admin",
      phone: "0000000001",
      dob: new Date("1985-01-01"),
      role: "superadmin",
    },
    {
      _id: clubAdminId,
      username: "dummyclubadmin",
      email: "dummyclubadmin@mail.com",
      password,
      name: "Club Admin",
      phone: "0000000002",
      dob: new Date("1987-05-10"),
      role: "clubadmin",
    },
    {
      _id: userId,
      username: "dummyuser1",
      email: "dummyuser1@mail.com",
      password,
      name: "Regular User",
      phone: "0000000003",
      dob: new Date("1995-07-15"),
      role: "user",
    },
  ]);

  const clubs = await Club.insertMany(
    ["Chennai Club", "Bangalore Club", "Delhi Club"].map((name, i) => ({
      clubName: name,
      clubType: "social",
      contactNumber: `900000000${i}`,
      email: `club${i}@mail.com`,
      addressLine1: `Street ${i}`,
      addressLine2: `Area ${i}`,
      city: name.split(" ")[0],
      state: "State",
      country: "India",
      postalCode: "60000" + i,
      status: "active",
      description: `${name} Description`,
      website: `https://www.${name.toLowerCase().replace(" ", "")}.com`,
      clubAdmin: clubAdminId,
    }))
  );

  const now = new Date();
  const events = [];

  clubs.forEach((club, index) => {
    const baseDate = new Date(now);
    baseDate.setDate(baseDate.getDate() + 7 * index);

    const firstStart = new Date(baseDate);
    const firstEnd = new Date(baseDate);
    firstEnd.setDate(firstEnd.getDate() + 2);

    const secondStart = new Date(firstEnd);
    secondStart.setDate(secondStart.getDate() + 5);
    const secondEnd = new Date(secondStart);
    secondEnd.setDate(secondEnd.getDate() + 2);

    events.push(
      {
        eventName: `Event A - ${club.clubName}`,
        eventStartDate: firstStart,
        eventEndDate: firstEnd,
        startTime: "10:00",
        duration: 4,
        address: club.addressLine1,
        city: club.city,
        description: "Event A description",
        seatCount: 100,
        availableSeats: 90,
        bookedSeats: 10,
        amountPerSeat: 200,
        maxBookingPerUser: 5,
        clubId: club._id,
      },
      {
        eventName: `Event B - ${club.clubName}`,
        eventStartDate: secondStart,
        eventEndDate: secondEnd,
        startTime: "14:00",
        duration: 4,
        address: club.addressLine1,
        city: club.city,
        description: "Event B description",
        seatCount: 150,
        availableSeats: 145,
        bookedSeats: 5,
        amountPerSeat: 250,
        maxBookingPerUser: 3,
        clubId: club._id,
      }
    );
  });

  const insertedEvents = await Event.insertMany(events);

  const booking = await Booking.insertMany([
    {
      eventId: insertedEvents[0]._id,
      seatCount: 2,
      userId,
      status: "confirmed",
    },
    {
      eventId: insertedEvents[1]._id,
      seatCount: 3,
      userId,
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
