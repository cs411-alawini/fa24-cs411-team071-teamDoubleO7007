import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './CropSelector.css'; // Add custom styles

const CropSelector = ({ onSelectCrops }) => {
  const [crops, setCrops] = useState([]);
  const [selectedCrops, setSelectedCrops] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3007/api/crops')
      .then(response => {setCrops(response.data);})
      .catch(error => console.error(error));
  }, []);

  const handleCheckboxChange = (crop) => {
    const updatedCrops = selectedCrops.includes(crop)
      ? selectedCrops.filter((c) => c !== crop)
      : [...selectedCrops, crop];

    setSelectedCrops(updatedCrops);
    onSelectCrops(updatedCrops);
  };

  return (
    <div className="crop-selector">
      <h3>Select Crops:</h3>
      <div className="grid-container">
        {crops.map((crop) => (
          <div key={crop.crop_name} className="grid-item">
            <label className="crop-checkbox">
              <input
                type="checkbox"
                value={crop.crop_name}
                checked={selectedCrops.includes(crop.crop_name)}
                onChange={() => handleCheckboxChange(crop.crop_name)}
              />
              {crop.crop_name}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CropSelector;
