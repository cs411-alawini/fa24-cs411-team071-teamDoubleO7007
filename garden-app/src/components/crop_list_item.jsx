import { useState, useEffect } from "react";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';


function CropListItem({ crop, setPlantToAdd }) {

    const addToPlant = () => {
        setPlantToAdd((cur) => {
            cur['crop_Name'] = crop.crop_name
            return { ...cur }
        })
    }

    return (
        <Stack id={crop.crop_name} direction="row" spacing={0.5} sx={{ justifyContent: "center", alignItems: "center" }} >

            <p>{crop.crop_name}</p>
            <Button size="small" onClick={addToPlant}>add</Button>
        </Stack>
    )
}

export default CropListItem
