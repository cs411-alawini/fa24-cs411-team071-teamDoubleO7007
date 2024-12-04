import { Router, Request, Response } from "express";
import { getAllCrops } from "../services/database";
import { Crop } from "../models/cropType";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  // if there is no query parameter, return all Pokémon
  try {
    const crop = await getAllCrops()
    res.status(200).json(crop)
  } catch (err) {
    res.status(500).json({message: err})
  }

});

export default router