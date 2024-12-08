import React from "react";
import "./GardenManager.css";
import GardenItem from "./components/garden_item";
import Profits from "./components/proftis";

const GardenManager = ({ gardenCrops, setGardenCrops }) => {

  return (
    <div className="garden-manager">
      <h3>Manage Your Garden</h3>
      <div className="garden-crops">
        <h4>Total Profits:</h4>
         <Profits gardenCrops={gardenCrops}/>
        <h4>Current Crops:</h4>
        {gardenCrops.map((crop) => (
          <GardenItem plant={crop} setGardenCrops={setGardenCrops} />
        ))}
      </div>
    </div>
  );
};

export default GardenManager;
