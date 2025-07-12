import request from "supertest";
import app from "../../app.mjs";

import { getEventAndSeatingIds } from "./helper.mjs";

const eventId = "685d3ae2b99c6d85142561a1";
const eventSeatingId = "685d3ae2b99c6d85142561a6";

describe("Club API Tests", () => {
  it("Should fetch events", async () => {
    const response = await request(app)
      .get("/api/v1/common/event")
      .send()
      .expect(200);
    expect(response.body.message).toBe("Events fetched successfully");
  });
});

describe("Club API by event id Tests", () => {
  it("Should fetch events by id", async () => {
    const response = await request(app)
      .get("/api/v1/common/event/" + eventId)
      .send()
      .expect(200);
    expect(response.body.message).toBe("Club fetched successfully");
  });
});

describe("Booking API by event id Tests", () => {
  it("Should fetch seatings by event id", async () => {
    const response = await request(app)
      .get("/api/v1/common/event/" + eventId + "/seating")
      .send()
      .expect(200);
    expect(response.body.message).toBe("Club seating fetched successfully");
  });
});

describe("Booking API by seating id Tests", () => {
  it("Should fetch event seating by eventid and eventSeatingId", async () => {
    const response = await request(app)
      .get(
        "/api/v1/common/event" + "/" + eventId + "/seating/" + eventSeatingId
      )
      .send()
      .expect(200);
    expect(response.body.message).toBe("Club seating fetched successfully");
  });
});
