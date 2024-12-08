import { useState, useEffect } from "react";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { deleteGardenPlant } from "../services/services";
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { updateGardenPlant } from "../services/services";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};


function GardenItem({ plant, setGardenCrops }) {

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const changeOrder = (evt) => {
        setOrderby(evt.target.value);
        // setPlantToAdd((cur) => {
        //     cur['vendor_Name'] = evt.target.value
        //     return { ...cur }
        // })
    }
    const [orderby, setOrderby] = useState(plant.vendor_Name);

    const onDelete = () => {
        deleteGardenPlant(plant.id)
        setGardenCrops((prev) => {
            const temp = prev.filter((p) => p.id != plant.id)
            return [...temp]
        })
    }

    const onEdit = () => {
        handleClose()
        updateGardenPlant(plant.id, orderby)
        plant.vendor_Name = orderby
        setGardenCrops((prev) => {
            const copy = [...prev]
            for (let i = 0; i < copy.length; i++) {
                if (copy[i].id === plant.id) {
                    copy[i].vendor_Name = orderby
                    break
                }
            }
            return copy
        })
    }

    const vendor_names = ["Walmart", "Kroger", "Costco", "Target"]

    return (
        <div>
            <Stack id={plant.crop_Name} direction="row" spacing={0.5} sx={{ justifyContent: "center", alignItems: "center" }} >

                <p>{plant.crop_Name}</p>
                {/* <Button size="small" onClick={onDelete}>Delete</Button> */}
                <IconButton aria-label="delete" onClick={onDelete}>
                    <DeleteIcon />
                </IconButton>
                <IconButton aria-label="edit" onClick={handleOpen}>
                    <ModeEditIcon />
                </IconButton>
            </Stack>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            flexDirection: "row",
                            alignItems: "center"
                        }}
                    >
                        <h3>Change Vendor</h3>
                        <FormControl sx={{ minWidth: 210 }}>
                            <Select
                                labelId="sort-direction-select-id"
                                id="sort-order-select-label"
                                value={orderby}
                                inputProps={{ 'aria-label': 'Without label' }}
                                onChange={changeOrder}
                            >
                                {
                                    vendor_names.map(
                                        s => (<MenuItem value={s}>{s}</MenuItem>)
                                    )
                                }
                            </Select>
                        </FormControl>
                    </Box>

                    <Button variant="contained" onClick={onEdit}>Update Crop</Button>
                </Box>
            </Modal>
        </div>

    )

}

export default GardenItem