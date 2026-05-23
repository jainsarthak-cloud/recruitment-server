import mongoose, { Schema } from "mongoose";
import bcrypt from "bcryptjs";

const EmployeeSchema = new Schema(
  {
    employeeId: {
      type: String,
      unique: true,
      index: true,
    },
    employeeName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    phoneNumber: {
      type: String,
    },
    password: {
      type: String,
      required: true,
    },
    employeeRole: {
      type: String,
      enum: ["HR", "Manager", "Staff"],
      default: "Staff",
    },
  },
  {
    timestamps: true,
  },
);

EmployeeSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

EmployeeSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

export default mongoose.model("Employee", EmployeeSchema);
