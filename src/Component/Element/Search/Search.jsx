import React, { useState, useEffect } from "react";
import axios from "axios";
import Button from "../Button/Button";

const Search = ({ onSearch, onReset }) => {
  const [categories, setCategories] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      const url = "https://travel-journal-api-bootcamp.do.dibimbing.id";
      try {
        const response = await axios.get(`${url}/api/v1/categories`, {
          headers: {
            apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
          },
        });
        setCategories(response.data.data);
      } catch (err) {
        console.error("Failed to fetch categories:", err);
        setError("Failed to fetch categories");
      }
    };

    fetchCategories();
  }, []);

  const handleSearch = async () => {
    if (!selectedCategoryId) {
      setError("Please select a category");
      onSearch([]); 
      return;
    }

    try {
      const url = "https://travel-journal-api-bootcamp.do.dibimbing.id";
      const response = await axios.get(
        `${url}/api/v1/activities-by-category/${selectedCategoryId}`,
        {
          headers: {
            apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
          },
        }
      );

      if (response.data.data.length === 0) {
        onSearch([]);
        setError("No activities found for the selected category");
      } else {
        onSearch(response.data.data);
        setError(null);
      }
    } catch (err) {
      if (err.response && err.response.status === 404) {
        setError("No activities found for the selected category");
      } else {
        setError("Error fetching activities");
      }
      onSearch([]);
    }
  };

  const handleReset = () => {
    setSelectedCategoryId("");
    setError(null);
    onReset();
  };

  return (
    <div className="flex flex-col items-center gap-4 p-4 md:flex-row md:items-start">
      <select
        value={selectedCategoryId}
        onChange={(e) => setSelectedCategoryId(e.target.value)}
        className="w-full p-2 mb-4 border border-green-800 md:w-1/2 rounded-xl md:mb-0"
      >
        <option value="">Select</option>
        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>
      <div className="flex flex-col w-full gap-2 md:flex-row md:w-auto">
        <Button text="Search" onClick={handleSearch} className="w-full md:w-auto" />
        <Button text="Reset" onClick={handleReset} className="w-full md:w-auto" />
      </div>

      {error && <p className="text-center text-red-500  md:text-left">{error}</p>}
    </div>
  );
};

export default Search;
