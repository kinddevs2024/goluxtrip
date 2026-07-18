import mongoose from "mongoose";

const ProjectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  longDescription: { type: String },
  photos: [{ type: String }],
  isActive: { type: Boolean, default: true },
}, { timestamps: true });

ProjectSchema.index({ createdAt: -1 });

export default mongoose.models.Project || mongoose.model("Project", ProjectSchema);
