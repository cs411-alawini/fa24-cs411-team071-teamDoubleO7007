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

// given exact name, returns one crop from crop stats
export async function getCropStatsByName(crop_name: string): Promise<Crop | undefined> {
  const sqlQuery = `SELECT * FROM crop_stats WHERE crop_name = '${crop_name}';`
  const [rows] = await pool.query<RowDataPacket[]>(sqlQuery);
  return rows[0] as Crop;
}

// given a string, returns all crops that contain serach query in name
export async function getCropsSearchByName(crop_name: string): Promise<Crop[]> {
  const sqlQuery = `SELECT * FROM crop_stats WHERE crop_name LIKE '%${crop_name}%';`
  const [rows] = await pool.query<RowDataPacket[]>(sqlQuery);
  return rows as Crop[];
}

// given a crop, returns 10 best states in order to grow crop
export async function getStateFromCrops(crop_name: string): Promise<Crop[]> {
  const sqlQuery = `SELECT state_name 
FROM
(SELECT state_name, ABS(avgStats - cropAvg) as similarity
FROM
(SELECT state_name, AVG(soil_ph + nitrogen + phosphorous + potassium + average_rain + humidity + temp) AS avgStats
FROM city_stats
GROUP BY state_name
) AS tba, (SELECT (soil_ph + nitrogen + phosphorous + potassium + average_rain + humidity + temp) AS cropAvg
FROM crop_stats
WHERE crop_name = '%${crop_name}%') AS tbb) as tbc
ORDER BY similarity
LIMIT 10;`
  const [rows] = await pool.query<RowDataPacket[]>(sqlQuery);
  return rows as Crop[];
}


// addPlantToGarden


// deletePlantFromGarden

