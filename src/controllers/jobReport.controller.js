import jobReportService from "../services/jobReport.service.js";
import { asyncHandler } from "../utils/asyncHandler.js";

class JobReportController {
  reportJob = asyncHandler(async (req, res) => {
    const { jobId } = req.params;

    const report = await jobReportService.reportJob(
      req.userId,
      jobId,
      req.body,
    );
    res.status(201).json({
      success: true,
      data: report,
    });
  });

  getMyReports = asyncHandler(async (req, res) => {
    const reports = await jobReportService.getMyReports(req.user.id);
    res.status(200).json({
      success: true,
      data: reports,
    });
  });

  getAllReports = asyncHandler(async (req, res) => {
    const reports = await jobReportService.getAllReports(req.query);
    res.status(200).json({
      success: true,
      data: reports,
    });
  });

  updateReportStatus = asyncHandler(async (req, res) => {
    const { reportId } = req.params;
    const { status } = req.body;
    const updated = await jobReportService.updateReportStatus(reportId, status);

    res.status(200).json({
      success: true,
      data: updated,
    });
  });

  deleteReport = asyncHandler(async (req, res) => {
    const { reportId } = req.params;
    await jobReportService.deleteReport(reportId);
    res
      .status(200)
      .json({ success: true, message: "Report deleted successfully" });
  });
}

export default JobReportController;
