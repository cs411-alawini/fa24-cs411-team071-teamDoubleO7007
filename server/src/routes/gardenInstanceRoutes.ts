import { Router, Request, Response } from "express";
import { db } from "../services/connections";
import { GardenEntry } from "../models/gardenEntryType";

const router = Router();

// Fetch crops in the garden
router.get("/", async (req: Request, res: Response) => {
    try {
        const query = `SELECT * FROM garden_instance;`;

        // Explicitly type the result of the query
        const garden_entries = await db.query<GardenEntry[]>(query);

        res.status(200).json(garden_entries); // Safely map over the array
    } catch (err) {
        console.error("Error fetching garden crops:", err);
        res.status(500).json({ error: "Failed to fetch garden crops" });
    }
});


// create table garden_instance (
//     id varchar(255) Primary key,
//     crop_Name varchar(255),
//     city_name varchar(255),
//     vendor_Name varchar(255)
// );

// Add a crop to the garden
router.post("/", async (req: Request, res: Response) => {
    const { id, crop_Name, city_name, vendor_Name } = req.body;


    if (!id) {
        return res.status(400).json({ error: "Entry Id Required" });
    }

    try {
        const query = `INSERT INTO garden_instance (id, crop_Name, city_name, vendor_Name) VALUES (?, ?, ?, ?);`;
        await db.query(query, [id, crop_Name, city_name, vendor_Name]);
        res.status(201).json({ message: "Crop added to garden successfully" });
    } catch (err) {
        console.error("Error adding crop to garden:", err);
        res.status(500).json({ error: "Failed to add crop to garden" });
    }
});

// Remove a crop from the garden
router.delete("/:id", async (req: Request, res: Response) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({ error: "Crop Id Required to delete" });
    }

    try {
        const query = `DELETE FROM garden_instance WHERE id = ?;`;
        await db.query(query, [id]);
        res.status(200).json({ message: "Crop removed from garden successfully" });
    } catch (err) {
        console.error("Error removing crop from garden:", err);
        res.status(500).json({ error: "Failed to remove crop from garden" });
    }
});

export default router;
