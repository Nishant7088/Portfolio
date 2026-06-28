import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    category: {
      type: String,
      required: true,
      enum: ["Frontend", "Full Stack", "UI/UX", "MERN"],
    },
    shortDescription: { type: String, required: true, maxlength: 200 },
    detailedDescription: { type: String, required: true },
    technologies: [{ type: String }],
    imageUrl: { type: String, required: true },
    githubUrl: { type: String },
    liveUrl: { type: String },
    featured: { type: Boolean, default: false },
    status: {
      type: String,
      enum: ["Completed", "In Progress", "Planned"],
      default: "Completed",
    },
    completionDate: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export default mongoose.model("Project", projectSchema);
