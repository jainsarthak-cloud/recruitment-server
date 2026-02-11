import express from "express";
import JobReportController from "../controllers/jobReport.controller.js";
import { authenticateJWT } from "../middlewares/auth.middleware.js";
// import { authorize } from "../middlewares/role.middleware.js";

const router = express.Router();

const jobReportController = new JobReportController();

router.post(
  "/report-job/:jobId",
  authenticateJWT,
  // authorize("user"),
  jobReportController.reportJob,
);

router.get(
  "/get-my-reports",
  authenticateJWT,
  // authorize("user"),
  jobReportController.getMyReports,
);
router.get(
  "/get-all-reports",
  authenticateJWT,
  // authorize("admin"),
  jobReportController.getAllReports,
);
router.patch(
  "/update-report-status/:reportId",
  authenticateJWT,
  // authorize("admin"),
  jobReportController.updateReportStatus,
);

router.delete(
  "/delete-report/:reportId",
  authenticateJWT,
  // authorize("admin"),
  jobReportController.deleteReport,
);

export default router;
