import mongoose from "mongoose";

const PartnerSchema = new mongoose.Schema({
  image: { type: String, required: true },
}, { timestamps: true });

PartnerSchema.index({ createdAt: -1 });

export default mongoose.models.Partner || mongoose.model("Partner", PartnerSchema);
