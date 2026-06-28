import mongoose from "mongoose";

const testimonialSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    role: { type: String },
    company: { type: String },
    message: { type: String, required: true },
    avatarUrl: { type: String },
    rating: { type: Number, min: 1, max: 5, default: 5 },
    approved: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model("Testimonial", testimonialSchema);
