import express from "express";
import { shareCandidateProfile } from "../controllers/shareCandidates.controller.js";

const router = express.Router();

// GET candidate profile by userId
router.get("/candidates/profile/:userId", shareCandidateProfile);

export default router;
