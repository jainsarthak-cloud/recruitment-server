import { getCandidateProfile } from "../services/shareCandidates.service.js";
import mongoose from "mongoose";

export async function shareCandidateProfile(req, res) {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res
        .status(400)
        .json({ success: false, message: "User ID is required" });
    }


    const result = await getCandidateProfile(userId);

    if (!result || result.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Candidate not found" });
    }




    if (!mongoose.isValidObjectId(userId)) {
  return res.status(400).json({
    success: false,
    message: "Invalid user ID format",
  });
}

    // return single object (not array)
    return res.status(200).json({ success: true, data: result[0] });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
}
