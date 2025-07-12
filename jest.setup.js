// import dotenv from "dotenv";
// dotenv.config();

import { connectDBTest, disconnectDB } from "./src/config/db.mjs";
import { dbInserts, loginAndGetToken } from "./src/__test__/helper.mjs";
import Club from "./src/models/Club.mjs";
import User from "./src/models/User.mjs";
import ClubEvent from "./src/models/Club.mjs";
import Booking from "./src/models/Booking.mjs";

globalThis.TEST_CONTEXT = {};

beforeAll(async () => {
  await connectDBTest();
  await dbInserts();

  // globalThis.TEST_CONTEXT.token = await loginAndGetToken({
  //   username: "testadmin",
  //   password: "testpassword123",
  // });

  // const eventDetails = await getEventAndBookingIds();
  // globalThis.TEST_CONTEXT.eventId = eventDetails.eventId;
  // globalThis.TEST_CONTEXT.eventBookingId = eventDetails.eventBookingId;
});

await afterAll(async () => {
  await User.deleteMany();
  await Club.deleteMany();
  await ClubEvent.deleteMany();
  await Booking.deleteMany();
  await disconnectDB();
});
