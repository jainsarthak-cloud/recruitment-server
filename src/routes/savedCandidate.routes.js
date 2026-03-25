import express from "express";
import { authenticateJWT } from "../middlewares/auth.middleware.js";
import savedCandidateController from "../controllers/savedCandidate.controller.js";

const router = express.Router();

// Route to save a candidate
// POST /api/saved-candidates/:candidateId
// Request body: None
// Response: 201 Created with saved candidate details   
//http://localhost:5000/api/saved-candidates/64b8c9f1e1d3c2a5f0a1b2c
router.post("/:candidateId", savedCandidateController.saveCandidate);


//http://localhost:5000/api/saved-candidates
router.get("/", savedCandidateController.getSavedCandidates);

// http://localhost:5000/api/saved-candidates/64b8c9f1e1d3c2a5f0a1b2c/status
router.get(
  "/:candidateId/status",
   savedCandidateController.getSavedCandidateStatus
);

//http://localhost:5000/api/saved-candidates/64b8c9f1e1d3c2a5f0a1b2c
router.delete(
  "/:candidateId",
   savedCandidateController.removeSavedCandidate
);

export default router;
