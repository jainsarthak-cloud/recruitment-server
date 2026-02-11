import IJobReportRepository from "../contracts/IjobReportRepository.js";
import { JobReport } from "../../models/RjobReport.model.js";

class MongoJobReportRepository extends IJobReportRepository {
  async create(reportData) {
    const report = new JobReport(reportData);
    return await report.save();
  }
  async findByUserAndJob(userId, jobId) {
    return await JobReport.findOne({ userId, jobId });
  }
  async findByUser(userId) {
    return await JobReport.find({ userId });
  }
  async findAll(filter = {}) {
    return await JobReport.find(filter).sort({ createdAt: -1 });
  }
  async findById(reportId) {
    return await JobReport.findById(reportId);
  }
  async updateStatus(reportId, status) {
    return await JobReport.findByIdAndUpdate(
      reportId,
      { status },
      { new: true, runValidators: true },
    );
  }
  async deleteById(reportId) {
    return await JobReport.findByIdAndDelete(reportId);
  }
}

export default MongoJobReportRepository;
