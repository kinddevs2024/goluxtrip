import mongoose from "mongoose";

const RealMissionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: String },
  image: { type: String, required: true },
  longDescription: { type: String },
  photos: [{ type: String }],
  isActive: { type: Boolean, default: true },
}, { timestamps: true });

RealMissionSchema.index({ createdAt: -1 });

export default mongoose.models.RealMission || mongoose.model("RealMission", RealMissionSchema);
