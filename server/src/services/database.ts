import { Crop } from "../models/cropType"

import { cropData } from "../../../data/mockData"
import pool from "./connections"
import { RowDataPacket } from "mysql2"

export async function getAllCrops(): Promise<Crop[]> {
    const queryString = 'SELECT * FROM crop_stats LIMIT 20;'
    const [rows] = await pool.query(queryString)
    console.log(rows)
    return rows as Crop[]
}