import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CardMedia from '@mui/material/CardMedia';
import { useState, useEffect } from "react";
import { addGardenPlant } from '../services/services';
import { v4 as uuidv4 } from 'uuid';

function PlantAdd({ plantToAdd, setPlantToAdd, setOrderby, onSelectCrops }) {

    const shouldAdd = () => {
        if (plantToAdd.crop_Name === "" || plantToAdd.city_name === "" || plantToAdd.vendor_Name === "") {
            console.log("???")
            return false
        } else {
            console.log("vendor")
            console.log(plantToAdd.vendor_Name)
            return true
        }
    }

    const [isValid, setIsValid] = useState(shouldAdd)
    const [error, setError] = useState(null);

    useEffect(() => {
        setIsValid(shouldAdd())
    
      }, [plantToAdd]);


    // const onAdd = () => {
    //     const copyplant = {... plantToAdd}
    //     copyplant['id'] = uuidv4()
    //     addGardenPlant(copyplant)
    //     onSelectCrops((prev) => {
    //         const copy = [...prev]
    //         copy.push(copyplant)
    //         return copy
    //     })
    //     setPlantToAdd({ id: "", crop_Name: "", city_name: "", vendor_Name: "" })
    //     setOrderby("")
    // }

    const onAdd = async () => {
        try {
            const copyplant = {... plantToAdd}
            copyplant['id'] = uuidv4()
            await addGardenPlant(copyplant)
            onSelectCrops((prev) => {
                const copy = [...prev]
                copy.push(copyplant)
                return copy
            })
            setPlantToAdd({ id: "", crop_Name: "", city_name: "", vendor_Name: "" })
            setOrderby("")
            setError(null)
        } catch (error) {
            if (error.response && error.response.data.error) {
                setError(error.response.data.error);
            } else {
                setError("An unexpected error occurred");
            }
        }
    }

    return (

        <Card sx={{ maxWidth: 1200, mb: 3, mt: 3 }}>
            <CardContent>
                {error && (
                    <Typography variant="body2" color="error" sx={{ mb: 2 }}>
                        {error}
                    </Typography>
                )}
                <Typography gutterBottom variant="h5" component="div">
                    Selected Crop Information
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    Crop Type : {plantToAdd.crop_Name}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    City Name : {plantToAdd.city_name}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    Vendor Name : {plantToAdd.vendor_Name}
                </Typography>
            </CardContent>
            <CardActions>
                {isValid ? <Button size="small" onClick={onAdd}>Add To Garden</Button> : <Button size="small" disabled>Add To Garden</Button>}
            </CardActions>
        </Card>

    )
}

export default PlantAdd