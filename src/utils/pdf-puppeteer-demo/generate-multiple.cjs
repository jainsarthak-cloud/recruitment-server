const fs = require("fs");
const path = require("path");
const puppeteer = require("puppeteer");
const Handlebars = require("handlebars");
const xlsx = require("xlsx");
const axios = require("axios"); // Added axios for S3 fetching

class BulkCertificateGenerator {
  constructor() {
    // S3 URL for your template
    this.s3TemplateUrl = "https://sherihunt.s3.ap-south-1.amazonaws.com/certificate.html";
    this.outputDir = path.join(__dirname, "output");
    this.excelPath = path.join(__dirname, "students.xlsx");
    this.cachedTemplate = null;

    if (!fs.existsSync(this.outputDir)) {
      fs.mkdirSync(this.outputDir);
    }
  }

  // New method to fetch and compile the template once
  async initializeTemplate() {
    try {
      console.log(":open_file_folder: Fetching template from S3...");
      const response = await axios.get(this.s3TemplateUrl);

      // Compile it once and store it in memory
      this.cachedTemplate = Handlebars.compile(response.data);
      console.log(":white_check_mark: Template loaded and compiled.");
    } catch (error) {
      throw new Error(`Failed to fetch S3 template: ${error.message}`);
    }
  }

  readExcel() {
    const workbook = xlsx.readFile(this.excelPath);
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    return xlsx.utils.sheet_to_json(sheet);
  }

  async generatePdf(page, student) {
    // Use the cached template to generate final HTML
    const finalHtml = this.cachedTemplate({
      name: student.Name,
      internshipRole: student.InternshipRole,
      organizationName: student.OrganizationName,
      startDate: student.StartDate,
      endDate: student.EndDate,
    });

    // Set content and wait for network to be idle (important for S3 images/CSS)
    await page.setContent(finalHtml, {
      waitUntil: "domcontentloaded",
      timeout: 0,
    });

    const fileName = `${student.Name.replace(/\s+/g, "_")}.pdf`;
    const outputPath = path.join(this.outputDir, fileName);

    await page.pdf({
      path: outputPath,
      format: "A4",
      printBackground: true,
      margin: { top: "0px", right: "0px", bottom: "0px", left: "0px" }
    });

    console.log(":heavy_check_mark: Generated:", fileName);
  }

  async generateAllCertificates() {
    try {
      // 1. Load the template first
      await this.initializeTemplate();

      // 2. Read student data
      const students = this.readExcel();

      // 3. Launch Puppeteer
      const browser = await puppeteer.launch({
        headless: "new",
        args: ["--no-sandbox", "--disable-setuid-sandbox"],
      });

      const page = await browser.newPage();

      // 4. Loop through students
      for (const student of students) {
        await this.generatePdf(page, student);
      }

      await browser.close();
      console.log(":tada: All certificates generated successfully!");
    } catch (error) {
      console.error(":x: Bulk generation error:", error.message);
    }
  }
}

// Run the generator
const generator = new BulkCertificateGenerator();
generator.generateAllCertificates();