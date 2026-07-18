import dbConnect from "../lib/mongoose.js";
import Project from "../lib/models/Project.js";

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "10mb"
    }
  }
};

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS,PATCH,DELETE,POST,PUT");
  res.setHeader("Access-Control-Allow-Headers", "*");

  if (req.method === "OPTIONS") return res.status(200).end();

  try {
    await dbConnect();

    if (req.method === "GET") {
      const projects = await Project.find({}).sort({ _id: -1 }).lean();
      return res.status(200).json(projects);
    }

    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Unauthorized" });

    if (req.method === "POST") {
      const project = await Project.create(req.body);
      return res.status(201).json(project);
    }

    if (req.method === "PUT" || req.method === "PATCH") {
      const { id } = req.query;
      if (!id) return res.status(400).json({ message: "Missing project id" });
      const updated = await Project.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
      if (!updated) return res.status(404).json({ message: "Project not found" });
      return res.status(200).json(updated);
    }

    if (req.method === "DELETE") {
      const { id } = req.query;
      if (!id) return res.status(400).json({ message: "Missing project id" });
      await Project.findByIdAndDelete(id);
      return res.status(200).json({ message: "Deleted" });
    }

    return res.status(405).json({ message: "Method Not Allowed" });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
}
