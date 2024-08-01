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
    <div className="w-1/2 pl-10">
      <select
        value={selectedCategoryId}
        onChange={(e) => setSelectedCategoryId(e.target.value)}
        className="w-1/2 p-2 mb-4 mr-4 border border-green-800 rounded-xl"
      >
        <option value="">Select</option>
        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>
      <Button text="Search" onClick={handleSearch} className="mr-2" />
      <Button text="Reset" onClick={handleReset} />

      {error && <p className="mt-4 text-red-500">{error}</p>}
    </div>
  );
};

export default Search;
