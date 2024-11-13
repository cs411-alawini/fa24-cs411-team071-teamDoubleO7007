import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './CropSelector.css'; // Add custom styles

const CropSelector = ({ onSelectCrops }) => {
  const [crops, setCrops] = useState([]);
  const [selectedCrops, setSelectedCrops] = useState([]);

  useEffect(() => {
    axios.get('/api/crops')
      .then(response => setCrops(response.data))
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
      {crops.map((crop) => (
        <label key={crop} className="crop-checkbox">
          <input
            type="checkbox"
            value={crop}
            checked={selectedCrops.includes(crop)}
            onChange={() => handleCheckboxChange(crop)}
          />
          {crop}
        </label>
      ))}
    </div>
  );
};

export default CropSelector;
