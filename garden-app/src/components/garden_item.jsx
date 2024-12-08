import { useState, useEffect } from "react";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { deleteGardenPlant } from "../services/services";

function GardenItem({ plant, setGardenCrops }) {

    const onDelete = () => {
        deleteGardenPlant(plant.id)
        setGardenCrops((prev) => {
            const temp = prev.filter((p) => p.id != plant.id)
            return [ ...temp ]
        })
    }

    return (
        <Stack id={plant.crop_Name} direction="row" spacing={0.5} sx={{ justifyContent: "center", alignItems: "center" }} >

            <p>{plant.crop_Name}</p>
            <Button size="small" onClick={onDelete}>Delete</Button>
        </Stack>
    )

}

export default GardenItem