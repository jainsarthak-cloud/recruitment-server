import jobReportService from "../services/jobReport.service.js";
import { asyncHandler } from "../utils/asyncHandler.js";

class JobReportController {
  // POST /api/job-reports
  reportJob = asyncHandler(async (req, res) => {
    const { jobId, reason, description } = req.body;

    const report = await jobReportService.reportJob(req.userId, jobId, {
      reason,
      description,
    });

    res.status(201).json({
      success: true,
      data: report,
    });
  });

  // GET /api/job-reports/me
  getMyReports = asyncHandler(async (req, res) => {
    const reports = await jobReportService.getMyReports(req.userId);

    res.status(200).json({
      success: true,
      data: reports,
    });
  });

  // GET /api/job-reports
  getAllReports = asyncHandler(async (req, res) => {
    const reports = await jobReportService.getAllReports(req.query);

    res.status(200).json({
      success: true,
      data: reports,
    });
  });

  // PUT /api/job-reports/:id
  updateReportStatus = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    const updated = await jobReportService.updateReportStatus(id, status);

    res.status(200).json({
      success: true,
      data: updated,
    });
  });

  // DELETE /api/job-reports/:id
  deleteReport = asyncHandler(async (req, res) => {
    const { id } = req.params;

    await jobReportService.deleteReport(id);

    res.status(200).json({
      success: true,
      message: "Report deleted successfully",
    });
  });
}

export default JobReportController;
