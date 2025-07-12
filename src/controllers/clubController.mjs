import {
  createClubService,
  fetchClubsService,
  fetchClubByIdService,
  updateClubService,
  deleteClubService,
} from "../service/clubService.mjs";

import { successResponse } from "../utils/responseBuilder.mjs";
import { logger } from "../utils/logger.mjs";

export const createClub = async (req, res, next) => {
  try {
    const club = await createClubService(req.body);
    return successResponse({
      res,
      statusCode: 201,
      message: "Club created successfully",
      data: club,
    });
  } catch (error) {
    logger.error(error);
    next(error);
  }
};

export const fetchClubs = async (req, res, next) => {
  try {
    const { page, limit } = req.query;
    const result = await fetchClubsService({ page, limit });

    return successResponse({
      res,
      message: "Clubs fetched successfully",
      data: result.clubs,
      meta: {
        totalPages: result.totalPages,
        currentPage: result.currentPage,
      },
    });
  } catch (error) {
    console.log(error);
    logger.error(error);
    next(error);
  }
};

export const fetchClubById = async (req, res, next) => {
  try {
    const club = await fetchClubByIdService(req.params.id);
    return successResponse({
      res,
      message: "Club fetched successfully",
      data: club,
    });
  } catch (error) {
    logger.error(error);
    next(error);
  }
};

export const updateClub = async (req, res, next) => {
  try {
    const club = await updateClubService(req.params.id, req.body);
    return successResponse({
      res,
      message: "Club updated successfully",
      data: club,
    });
  } catch (error) {
    logger.error(error);
    next(error);
  }
};

export const deleteClub = async (req, res, next) => {
  try {
    const club = await deleteClubService(req.params.id);
    return successResponse({
      res,
      message: "Club deleted successfully",
      data: club,
    });
  } catch (error) {
    logger.error(error);
    next(error);
  }
};
