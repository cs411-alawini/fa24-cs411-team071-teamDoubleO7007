import React, { useState } from 'react';
import Map from './Map';
import CropSelector from './CropSelector';
import './App.css';

const App = () => {
  const [selectedCrops, setSelectedCrops] = useState([]);

  return (
    <div className="app-container">
      <h1>US Crop Growth Suitability</h1>
      <CropSelector onSelectCrops={setSelectedCrops} />
      <Map selectedCrops={selectedCrops} />
    </div>
  );
};

export default App;
