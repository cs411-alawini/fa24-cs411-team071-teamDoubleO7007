import { Crop } from "../models/cropType";
import pool from "./connections";
import { RowDataPacket } from "mysql2";

// Fetch crops with pagination
export async function getCropsPaginated(limit: number, offset: number): Promise<Crop[]> {
  const queryString = 'SELECT * FROM crop_stats LIMIT ? OFFSET ?;';
  try {
    const [rows] = await pool.query<RowDataPacket[]>(queryString, [limit, offset]);
    console.log(`Fetched crops with limit ${limit} and offset ${offset}:`, rows);
    return rows as Crop[];
  } catch (error) {
    console.error("Error fetching crops with pagination:", error);
    throw new Error("Failed to fetch crops with pagination");
  }
}
