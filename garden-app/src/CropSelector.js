import React, { useEffect, useState } from "react";
import axios from "axios";
// import "./CropSelector.css";
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import CropList from "./components/crop_list";
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import { searchCityData, searchCropData } from "./services/services";
import CityList from "./components/city_list";
import PlantAdd from "./components/plant_add";

const CropSelector = ({ onSelectCrops, gardenCrops }) => {
  // const [crops, setCrops] = useState([]); // Current page of crops
  // const [searchQuery, setSearchQuery] = useState(""); // Search query
  console.log("render")

  const [searchQueryCity, setSearchQueryCity] = useState(""); // Search query
  const [city, setCity] = useState([]); // Current page of crops

  const [selectedCrops, setSelectedCrops] = useState(gardenCrops || []); // Tracks selected crops

  const [plantToAdd, setPlantToAdd] = useState({ id: "", crop_Name: "", city_name: "", vendor_Name: "" })

  const changeOrder = (evt) => {
    setOrderby(evt.target.value);
    setPlantToAdd((cur) => {
      cur['vendor_Name'] = evt.target.value
      return {...cur}
    })
  }
  const [orderby, setOrderby] = useState("");
  const [open, setOpen] = useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  // Sync selectedCrops with gardenCrops when they change
  // useEffect(() => {
  //   setSelectedCrops(gardenCrops);
  // }, [gardenCrops]);

  // Fetch crops from API
  // useEffect(() => {
  //   const fetchCrops = async () => {
  //     setCrops([])
  //     const data = await searchCropData(searchQuery)
  //     setCrops(data)
  //   };

  //   fetchCrops();
  // }, [searchQuery]);


  useEffect(() => {
    const fetchCities = async () => {
      setCity([])
      const data = await searchCityData(searchQueryCity)
      setCity(data)
    };

    fetchCities();
  }, [searchQueryCity]);

  // Handle search input
  // const handleSearch = (query) => {
  //   setSearchQuery(query);
  // };


  const handleSearchCity = (query) => {
    setSearchQueryCity(query);
  };

  // Handle crop selection/deselection
  const handleCheckboxChange = (cropName) => {
    const isSelected = selectedCrops.includes(cropName);

    // Update the selected crops list
    // const updatedCrops = isSelected
    //   ? selectedCrops.filter((name) => name !== cropName) // Remove crop if unchecked
    //   : [...selectedCrops, cropName]; // Add crop if checked

    // setSelectedCrops(updatedCrops);
    // onSelectCrops(updatedCrops); // Notify parent component of selected crops

    // Add or remove crop from the garden
    // if (isSelected) {
    //   onAddToGarden(cropName, "remove"); // Remove from garden if unchecked
    // } else {
    //   onAddToGarden(cropName, "add"); // Add to garden if checked
    // }
  };
  const vendor_names = ["Walmart", "Kroger", "Costco", "Target"]
  const DrawerList = (

    <div className="crop-selector">
      <Box
        component="form"
        sx={{
          display: "flex",
          justifyContent: "space-evenly",
          flexDirection: "column",
          alignItems: "center"
        }}
        noValidate
        autoComplete="off"
      >
        <PlantAdd plantToAdd={plantToAdd} setPlantToAdd={setPlantToAdd} setOrderby={setOrderby} onSelectCrops={onSelectCrops}/>
        <Box
          component="form"
          sx={{
            display: "flex",
            justifyContent: "space-evenly",
            flexDirection: "row",
            alignItems: "start"
          }}
          noValidate
          autoComplete="off"
        >
          {/* <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              flexDirection: "column",
              alignItems: "center"
            }}
          >
            <TextField id="outlined-basic" label="Crops" variant="outlined" onChange={(e) => handleSearch(e.target.value)} value={searchQuery} /> */}
            <CropList setPlantToAdd={setPlantToAdd}/>
{/* 
          </Box> */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              alignItems: "center"
            }}
          >
            <TextField id="outlined-basic" label="City" variant="outlined" onChange={(e) => handleSearchCity(e.target.value)} value={searchQueryCity} />
            <CityList cities={city} setPlantToAdd={setPlantToAdd}/>
          </Box>
          <FormControl sx={{ minWidth: 150 }}>
            <Select
              labelId="sort-direction-select-id"
              id="sort-order-select-label"
              value={orderby}
              inputProps={{ 'aria-label': 'Without label' }}
              onChange={changeOrder}
            >
              <MenuItem value="">Select Vendor</MenuItem>
              {
                vendor_names.map(
                  s => (<MenuItem value={s}>{s}</MenuItem>)
                )
              }
            </Select>
          </FormControl>
        </Box>
      </Box>
    </div>
  );

  return (
    <div>
      <Button onClick={toggleDrawer(true)}>Add Crops</Button>
      <Drawer open={open} onClose={toggleDrawer(false)} anchor={'right'} PaperProps={{
        sx: { width: "60%" },
      }}>
        {DrawerList}
      </Drawer>
    </div>
  );

};

export default CropSelector;
