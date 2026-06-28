import mongoose from "mongoose";

const experienceSchema = new mongoose.Schema(
  {
    companyName: { type: String, required: true, trim: true },
    role: { type: String, required: true },
    employmentType: {
      type: String,
      enum: ["Full-time", "Internship", "Part-time", "Virtual Experience", "Freelance"],
      default: "Internship",
    },
    location: { type: String },
    startDate: { type: Date, required: true },
    endDate: { type: Date },
    currentCompany: { type: Boolean, default: false },
    description: { type: String, required: true },
    skillsUsed: [{ type: String }],
  },
  { timestamps: true }
);

export default mongoose.model("Experience", experienceSchema);
