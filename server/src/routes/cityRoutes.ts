import { Router, Request, Response } from "express";
import { db } from "../services/connections";
import { City } from "../models/cityType";

const router = Router();

router.get("/", async (req: Request, res: Response) => {

    try {
        const search = req.query.search ? `%${req.query.search}%` : '%'; // Search query, default to all
        // Fetch total count of matching crops

        // Fetch paginated crops with search
        const cropsQuery = `
      SELECT * FROM city_stats
      WHERE city_name LIKE ?;`;

        const cities = await db.query<City[]>(cropsQuery, [search]);

        res.status(200).json(cities);
    } catch (err) {
        console.error("Error fetching crops with pagination and search:", err);
        res.status(500).json({ error: "Failed to fetch city stats" });
    }

    // try {
    //     const limit = parseInt(req.query.limit as string) || 24; // Default limit: 20
    //     const offset = parseInt(req.query.offset as string) || 0; // Default offset: 0
    //     const search = req.query.search ? `%${req.query.search}%` : '%'; // Search query, default to all
    //     // Fetch total count of matching crops
    //     const totalQuery = `SELECT COUNT(*) AS total FROM city_stats WHERE city_name LIKE ?;`;
    //     const [totalResult] = await db.query<{ total: number }[]>(totalQuery, [search]);
    //     console.log(totalResult)

    //     const total = totalResult;

    //     // Fetch paginated crops with search
    //     const cropsQuery = `
    //   SELECT * FROM city_stats
    //   WHERE city_name LIKE ?
    //   LIMIT ? OFFSET ?;
    // `;
    //     const cities = await db.query<City[]>(cropsQuery, [search, limit, offset]);

    //     res.status(200).json({ cities, total });
    // } catch (err) {
    //     console.error("Error fetching crops with pagination and search:", err);
    //     res.status(500).json({ error: "Failed to fetch city stats" });
    // }
});

export default router;