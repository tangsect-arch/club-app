import Club from "../models/Club.mjs";

export const createClubService = async (data) => {
  const { clubName, city } = data;
  const existing = await Club.findOne({ clubName, city });

  if (existing) {
    const error = new Error(
      "Club with the same name already exists in this city"
    );
    error.statusCode = 400;
    throw error;
  }

  const club = new Club(data);
  return await club.save();
};

export const fetchClubsService = async ({ page = 1, limit = 10 }) => {
  const skip = (page - 1) * limit;

  const [clubs, total] = await Promise.all([
    Club.find()
      .populate("clubAdmin", "name email")
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 }),
    Club.countDocuments(),
  ]);

  return {
    clubs,
    totalPages: Math.ceil(total / limit),
    currentPage: Number(page),
  };
};

export const fetchClubByIdService = async (id) => {
  const club = await Club.findById(id).populate("clubAdmin", "name email");
  if (!club) {
    const error = new Error("Club not found");
    error.statusCode = 404;
    throw error;
  }
  return club;
};

export const updateClubService = async (id, data) => {
  const club = await Club.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  }).populate("clubAdmin", "name email");

  if (!club) {
    const error = new Error("Club not found");
    error.statusCode = 404;
    throw error;
  }

  return club;
};

export const deleteClubService = async (id) => {
  const club = await Club.findByIdAndDelete(id);
  if (!club) {
    const error = new Error("Club not found");
    error.statusCode = 404;
    throw error;
  }
  return club;
};
