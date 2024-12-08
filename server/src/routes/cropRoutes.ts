import { Router, Request, Response } from "express";
import { db } from "../services/connections";
import { Crop } from "../models/cropType";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  const search = req.query.search ? `%${req.query.search}%` : '%'; // Search query, default to all

  try {
    // Fetch total count of matching crops

    // Fetch paginated crops with search
    const cropsQuery = `
      SELECT * FROM crop_stats
      WHERE crop_name LIKE ?;`;
    const crops = await db.query<Crop[]>(cropsQuery, [search]);

    res.status(200).json(crops);
  } catch (err) {
    console.error("Error fetching crops with pagination and search:", err);
    res.status(500).json({ error: "Failed to fetch crops" });
  }
  // const limit = parseInt(req.query.limit as string) || 24; // Default limit: 20
  // const offset = parseInt(req.query.offset as string) || 0; // Default offset: 0
  // const search = req.query.search ? `%${req.query.search}%` : '%'; // Search query, default to all

  // try {
  //   // Fetch total count of matching crops
  //   const totalQuery = `SELECT COUNT(*) AS total FROM crop_stats WHERE crop_name LIKE ?;`;
  //   const [totalResult] = await db.query<{ total: number }[]>(totalQuery, [search]);
  //   console.log(totalResult)

  //   const total = totalResult;

  //   // Fetch paginated crops with search
  //   const cropsQuery = `
  //     SELECT * FROM crop_stats
  //     WHERE crop_name LIKE ?
  //     LIMIT ? OFFSET ?;
  //   `;
  //   const crops = await db.query<Crop[]>(cropsQuery, [search, limit, offset]);

  //   res.status(200).json({ crops, total });
  // } catch (err) {
  //   console.error("Error fetching crops with pagination and search:", err);
  //   res.status(500).json({ error: "Failed to fetch crops" });
  // }
});

export default router;
