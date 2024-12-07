import { Router, Request, Response } from "express";
import { db } from "../services/connections";

const router = Router();

// Fetch crops in the garden
router.get("/:gard_id", async (req: Request, res: Response) => {
    const { gard_id } = req.params;

    try {
        const query = `SELECT crop_name FROM garden_data WHERE gard_id = ?;`;

        // Explicitly type the result of the query
        const crops: { crop_name: string }[] = await db.query(query, [gard_id]);

        res.status(200).json(crops.map((row) => row.crop_name)); // Safely map over the array
    } catch (err) {
        console.error("Error fetching garden crops:", err);
        res.status(500).json({ error: "Failed to fetch garden crops" });
    }
});

  
// Add a crop to the garden
router.post("/:gard_id/add", async (req: Request, res: Response) => {
  const { gard_id } = req.params;
  const { crop_name } = req.body;

  if (!crop_name) {
    return res.status(400).json({ error: "Crop name is required" });
  }

  try {
    const query = `INSERT INTO garden_data (gard_id, crop_name) VALUES (?, ?);`;
    await db.query(query, [gard_id, crop_name]);
    res.status(201).json({ message: "Crop added to garden successfully" });
  } catch (err) {
    console.error("Error adding crop to garden:", err);
    res.status(500).json({ error: "Failed to add crop to garden" });
  }
});

// Remove a crop from the garden
router.delete("/:gard_id/remove", async (req: Request, res: Response) => {
  const { gard_id } = req.params;
  const { crop_name } = req.body;

  if (!crop_name) {
    return res.status(400).json({ error: "Crop name is required" });
  }

  try {
    const query = `DELETE FROM garden_data WHERE gard_id = ? AND crop_name = ?;`;
    await db.query(query, [gard_id, crop_name]);
    res.status(200).json({ message: "Crop removed from garden successfully" });
  } catch (err) {
    console.error("Error removing crop from garden:", err);
    res.status(500).json({ error: "Failed to remove crop from garden" });
  }
});

export default router;
