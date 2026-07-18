import dbConnect from "../lib/mongoose.js";
import Stat from "../lib/models/Stat.js";

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS,PATCH,DELETE,POST,PUT");
  res.setHeader("Access-Control-Allow-Headers", "*");

  if (req.method === "OPTIONS") return res.status(200).end();

  try {
    await dbConnect();

    if (req.method === "GET") {
      const stats = await Stat.find({}).sort({ order: 1, _id: 1 }).lean();
      return res.status(200).json(stats);
    }

    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Unauthorized" });

    if (req.method === "POST") {
      const stat = await Stat.create(req.body);
      return res.status(201).json(stat);
    }

    if (req.method === "PUT" || req.method === "PATCH") {
      const { id } = req.query;
      if (!id) return res.status(400).json({ message: "Missing stat id" });
      const updated = await Stat.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
      if (!updated) return res.status(404).json({ message: "Stat not found" });
      return res.status(200).json(updated);
    }

    if (req.method === "DELETE") {
      const { id } = req.query;
      if (!id) return res.status(400).json({ message: "Missing stat id" });
      await Stat.findByIdAndDelete(id);
      return res.status(200).json({ message: "Deleted" });
    }

    return res.status(405).json({ message: "Method Not Allowed" });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
}
