import React from "react";
import "./GardenManager.css";

const GardenManager = ({ gardenCrops }) => {
  return (
    <div className="garden-manager">
      <h3>Manage Your Garden</h3>
      <div className="garden-crops">
        <h4>Current Crops:</h4>
        <ul>
          {gardenCrops.map((crop, index) => (
            <li key={index}>{crop}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default GardenManager;
