import mongoose from "mongoose";

const StatSchema = new mongoose.Schema({
  label: { type: String, required: true },
  value: { type: String, required: true },
  order: { type: Number, default: 0 },
}, { timestamps: true });

StatSchema.index({ order: 1 });

export default mongoose.models.Stat || mongoose.model("Stat", StatSchema);
