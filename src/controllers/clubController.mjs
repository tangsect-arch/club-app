import Club from "../models/Club.mjs";

export const createClub = async (req, res) => {
  try {
    const { clubName, location, description } = req.body;
    const newClub = new Club({
      clubName,
      location,
      description,
    });

    await newClub.save().catch((error) => {
      if (error.code === 11000) {
        return res.status(400).json({
          success: false,
          message: "Club with the same name already exists.",
        });
      }
    });

    res
      .status(201)
      .json({ success: true, message: "Club created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const fetchClubs = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const skip = (page - 1) * limit;

    const clubs = await Club.find()
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    const totalClubs = await Club.countDocuments();

    if (totalClubs === 0) {
      return res
        .status(404)
        .json({ success: false, message: "No clubs found" });
    }

    res.status(200).json({
      success: true,
      clubs,
      totalPages: Math.ceil(totalClubs / limit),
      currentPage: page,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const fetchClubById = async (req, res) => {
  try {
    const { id } = req.params;
    const club = await Club.findById(id);

    if (!club) {
      return res
        .status(404)
        .json({ success: false, message: "Club not found" });
    }

    res.status(200).json({ success: true, club });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const updateClub = async (req, res) => {
  try {
    const { id } = req.params;
    const { clubName, location, description } = req.body;

    const updatedClub = await Club.findByIdAndUpdate(
      id,
      { clubName, location, description },
      { new: true }
    );

    if (!updatedClub) {
      return res
        .status(404)
        .json({ success: false, message: "Club not found" });
    }

    res.status(200).json({ success: true, updatedClub });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const deleteClub = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedClub = await Club.findByIdAndUpdate(
      id,
      { isDeleted: true },
      { new: true }
    );

    deletedClub.save();
    if (!deletedClub) {
      return res
        .status(404)
        .json({ success: false, message: "Club not found" });
    }

    res
      .status(200)
      .json({ success: true, message: "Club deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
