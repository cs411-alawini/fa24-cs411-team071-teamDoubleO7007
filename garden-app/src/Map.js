import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import axios from 'axios';

const Map = ({ selectedCrops }) => {
  const [geoData, setGeoData] = useState(null);

  useEffect(() => {
    if (selectedCrops.length > 0) {
      // Fetch data for all selected crops (could adjust API to support multiple crops)
      axios
        .get(`/api/crop-data`, { params: { crops: selectedCrops } })
        .then((response) => setGeoData(response.data))
        .catch((error) => console.error(error));
    }
  }, [selectedCrops]);

  const style = (feature) => ({
    fillColor: feature.properties.score > 90 ? 'black' : 'grey',
    weight: 1,
    color: 'white',
    fillOpacity: 0.7,
  });

  return (
    <MapContainer center={[37.8, -96]} zoom={4} style={{ height: '600px', width: '100%' }}>
      {/* Black and white tile layer */}
      <TileLayer url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png" />
      {geoData && <GeoJSON data={geoData} style={style} />}
    </MapContainer>
  );
};

export default Map;
