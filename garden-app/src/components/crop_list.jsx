import Stack from '@mui/material/Stack';
import CropListItem from './crop_list_item';
import { useState, useEffect } from "react";
import Box from '@mui/material/Box';
import { searchCityData, searchCropData } from "../services/services";
import TextField from '@mui/material/TextField';

function CropList({ setPlantToAdd }) {


    const [crops, setCrops] = useState([]); // Current page of crops
    const [searchQuery, setSearchQuery] = useState(""); // Search query

    useEffect(() => {
        const fetchCrops = async () => {
            setCrops([])
            const data = await searchCropData(searchQuery)
            setCrops(data)
        };

        fetchCrops();
    }, [searchQuery]);

    const handleSearch = (query) => {
        setSearchQuery(query);
    };

    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "space-between",
                flexDirection: "column",
                alignItems: "center"
            }}
        >
            <TextField id="outlined-basic" label="Crops" variant="outlined" onChange={(e) => handleSearch(e.target.value)} value={searchQuery} />
            <Stack direction="column" spacing={1} sx={{ justifyContent: "center", alignItems: "center", mt: 2 }}>
                {crops.map((c) => {

                    return (
                        <CropListItem crop={c} setPlantToAdd={setPlantToAdd} />
                    )
                })}
            </Stack>

        </Box>
    )
}

export default CropList