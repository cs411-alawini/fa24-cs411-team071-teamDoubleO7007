import React, { useState, useEffect } from "react";
import CropSelector from "./CropSelector";
import Map from "./Map";
import GardenManager from "./GardenManager";
import axios from "axios";
import "./App.css";

const App = () => {
  const [gardenCrops, setGardenCrops] = useState([]); // Crops in the garden
  const [selectedCrops, setSelectedCrops] = useState([]); // Selected crops for the map
  const gardId = 1; // Example garden ID

  // Fetch garden crops from the backend on load
  useEffect(() => {
    const fetchGardenCrops = async () => {
      try {
        const response = await axios.get(`http://localhost:3007/api/garden/${gardId}`);
        setGardenCrops(response.data);
        setSelectedCrops(response.data); // Sync selectedCrops with gardenCrops on load
      } catch (error) {
        console.error("Error fetching garden crops:", error);
      }
    };

    fetchGardenCrops();
  }, [gardId]);

  // Add or remove a crop from the garden
  const handleAddToGarden = async (crop, action) => {
    try {
      if (action === "add" && !gardenCrops.includes(crop)) {
        await axios.post(`http://localhost:3007/api/garden/${gardId}/add`, { crop_name: crop });
        setGardenCrops((prev) => [...prev, crop]);
      } else if (action === "remove") {
        await axios.delete(`http://localhost:3007/api/garden/${gardId}/remove`, { data: { crop_name: crop } });
        setGardenCrops((prev) => prev.filter((name) => name !== crop));
      }
    } catch (error) {
      console.error(`Error ${action === "add" ? "adding" : "removing"} crop:`, error);
    }
  };

  return (
    <div className="app-container">
      <div className="sidebar">
        <GardenManager gardenCrops={gardenCrops} />
      </div>
      <div className="main-content">
        <h1>Crop Management App</h1>
        <CropSelector
          onSelectCrops={setSelectedCrops}
          onAddToGarden={handleAddToGarden}
          gardenCrops={gardenCrops} // Pass garden crops to sync checkbox states
        />
        <Map selectedCrops={selectedCrops} />
      </div>
    </div>
  );
};

export default App;
