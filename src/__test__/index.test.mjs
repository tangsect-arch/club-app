import { jest } from "@jest/globals";
import mongoose from "mongoose";

import { connectDBTest, disconnectDB } from "../config/db.mjs";
import User from "../models/User.mjs";
import Club from "../models/Club.mjs";
import ClubEvent from "../models/Event.mjs";
import Booking from "../models/Booking.mjs";
import { dbInserts } from "./helper.mjs";

import "./auth.test.mjs";
// import "./common.test.mjs";
// import "./event.test.mjs";
// import "./user.test.mjs";
