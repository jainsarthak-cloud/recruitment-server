import mongoose from "mongoose";
import ShareCandidates from "../models/shareCandidates.model.js";

export function getProfileAggregationPipeline(userId) {
  return [
    {
      $match: { userId: new mongoose.Types.ObjectId(userId) },
    },
    {
      $lookup: {
        from: "users",
        localField: "userId",
        foreignField: "_id",
        as: "user",
      },
    },
    { $unwind: "$user" },
    {
      $lookup: {
        from: "skills",
        localField: "skills",
        foreignField: "_id",
        as: "skillDocs",
      },
    },
    {
      $lookup: {
        from: "experiences",
        localField: "_id",
        foreignField: "candidateId",
        as: "experiences",
      },
    },
    {
      $addFields: {
        experiences: {
          $sortArray: {
            input: "$experiences",
            sortBy: { isCurrent: -1, startDate: -1 },
          },
        },
      },
    },
    {
      $project: {
        _id: 1,
        userId: 1,
        availability: 1,
        linkedinUrl: 1,
        githubUrl: 1,
        portfolioUrl: 1,
        highestEducation: 1,
        resumeFile: 1,
        resumeScore: 1,
        createdAt: 1,
        updatedAt: 1,
        user: {
          _id: "$user._id",
          firstName: "$user.firstName",
          lastName: "$user.lastName",
          email: "$user.email",
        },
        skills: {
          $map: {
            input: "$skillDocs",
            as: "skill",
            in: {
              name: "$$skill.name",
              _id: "$$skill._id",
            },
          },
        },
        experiences: 1,
      },
    },
    { $limit: 1 },
  ];
}

export async function getCandidateProfile(userId) {
  const pipeline = getProfileAggregationPipeline(userId);

 
  return await ShareCandidates.aggregate(pipeline);
}
