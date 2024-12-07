import React, { useEffect, useState } from "react";
import axios from "axios";
import "./CropSelector.css";

const CropSelector = ({ onSelectCrops, onAddToGarden, gardenCrops }) => {
  const [crops, setCrops] = useState([]); // Current page of crops
  const [searchQuery, setSearchQuery] = useState(""); // Search query
  const [page, setPage] = useState(1); // Current page
  const itemsPerPage = 24; // Items per page
  const [totalPages, setTotalPages] = useState(1); // Total number of pages
  const [selectedCrops, setSelectedCrops] = useState(gardenCrops || []); // Tracks selected crops

  // Sync selectedCrops with gardenCrops when they change
  useEffect(() => {
    setSelectedCrops(gardenCrops);
  }, [gardenCrops]);

  // Fetch crops from API
  useEffect(() => {
    const fetchCrops = async () => {
      try {
        const response = await axios.get("http://localhost:3007/api/crops", {
          params: {
            limit: itemsPerPage,
            offset: (page - 1) * itemsPerPage,
            search: searchQuery,
          },
        });

        setCrops(response.data.crops); // Assume API returns an object with crops and total count
        setTotalPages(Math.ceil(response.data.total / itemsPerPage));
      } catch (error) {
        console.error("Error fetching crops:", error);
      }
    };

    fetchCrops();
  }, [page, searchQuery]);

  // Handle search input
  const handleSearch = (query) => {
    setSearchQuery(query);
    setPage(1); // Reset to the first page when searching
  };

  // Handle crop selection/deselection
  const handleCheckboxChange = (cropName) => {
    const isSelected = selectedCrops.includes(cropName);

    // Update the selected crops list
    const updatedCrops = isSelected
      ? selectedCrops.filter((name) => name !== cropName) // Remove crop if unchecked
      : [...selectedCrops, cropName]; // Add crop if checked

    setSelectedCrops(updatedCrops);
    onSelectCrops(updatedCrops); // Notify parent component of selected crops

    // Add or remove crop from the garden
    if (isSelected) {
      onAddToGarden(cropName, "remove"); // Remove from garden if unchecked
    } else {
      onAddToGarden(cropName, "add"); // Add to garden if checked
    }
  };

  return (
    <div className="crop-selector">
      <h3>Select Crops:</h3>
      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search crops..."
        value={searchQuery}
        onChange={(e) => handleSearch(e.target.value)}
        className="search-bar"
      />
      {/* Crop List */}
      <div className="grid-container">
        {crops.map((crop) => (
          <div key={crop.crop_name} className="grid-item">
            <label>
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
      {/* Pagination Controls */}
      <div className="pagination-controls">
        <button
          disabled={page === 1}
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
        >
          Previous
        </button>
        <span>
          Page {page} of {totalPages}
        </span>
        <button
          disabled={page === totalPages}
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default CropSelector;
