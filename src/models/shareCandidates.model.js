import mongoose from "mongoose";

const shareCandidatesSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    skills: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Skill" }
    ],

    availability: { type: String },
    linkedinUrl: { type: String },
    githubUrl: { type: String },
    portfolioUrl: { type: String },
    highestEducation: { type: String },
    resumeFile: { type: String },
    resumeScore: { type: Number },

  },
  { timestamps: true }
);

// model name
const ShareCandidates = mongoose.model(
  "ShareCandidates",
  shareCandidatesSchema
);

// **default export**
export default ShareCandidates;
