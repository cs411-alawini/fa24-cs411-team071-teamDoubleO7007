import { Router, Request, Response } from "express";
import { db } from "../services/connections";
import { GardenEntry } from "../models/gardenEntryType";

const router = Router();

// Fetch crops in the garden
router.get("/", async (req: Request, res: Response) => {
    try {
        // const query = `SELECT SUM(DISTINCT price) as price
        // FROM garden_instance INNER JOIN sell_stats
        // ON garden_instance.crop_Name = sell_stats.crop_name AND
        // garden_instance.vendor_Name = sell_stats.vendor_name;`;

        // Explicitly type the result of the query
        const result = await db.query<any>("CALL GetTotalProfit()"); // Switched to Stored Procedure on GCP
        const rows = result[0];
        const priceRow = rows[0];
        const price = priceRow ? priceRow.price : 0;
        res.status(200).json({price}); // Safely map over the array
    } catch (err) {
        console.error("Error fetching prices:", err);
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

// Remove a crop from the garden
router.get("/:id", async (req: Request, res: Response) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({ error: "Garden entry ID Required" });
    }

    try {
        const query = `SELECT price
        FROM sell_stats 
        WHERE vendor_name = (SELECT vendor_Name from garden_instance WHERE id = ?)
        AND crop_Nname = (SELECT crop_Name from garden_instance WHERE id = ?)
        LIMIT 1;`;

        // Explicitly type the result of the query
        const price = await db.query<Number>(query, [id, id]);
        res.status(200).json(price); // Safely map over the array
    } catch (err) {
        console.error("Error geting price:", err);
        res.status(500).json({ error: "Failed to get Price" });
    }
});

export default router;
