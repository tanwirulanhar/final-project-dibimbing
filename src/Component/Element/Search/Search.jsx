import React, { useState, useEffect } from "react";
import axios from "axios";
import Button from "../Button/Button";
import { format } from "date-fns"; // Pastikan date-fns diinstal

const Search = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState("");
  const [activities, setActivities] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch all categories on component mount
    const fetchCategories = async () => {
      const url = "https://travel-journal-api-bootcamp.do.dibimbing.id";
      try {
        const response = await axios.get(`${url}/api/v1/categories`, {
          headers: {
            apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
          },
        });
        setCategories(response.data.data); // Sesuaikan dengan struktur data API
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
      setActivities([]);
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
        setActivities([]);
        setError("No activities found for the selected category");
      } else {
        setActivities(response.data.data);
        setError(null);
      }
    } catch (err) {
      if (err.response && err.response.status === 404) {
        setError("No activities found for the selected category");
      } else {
        setError("Error fetching activities");
      }
      setActivities([]);
    }
  };

  return (
    <div className="p-4">
      <h1 className="mb-4 text-2xl font-bold text-green-800">
        Search Activities
      </h1>
      <select
        value={selectedCategoryId}
        onChange={(e) => setSelectedCategoryId(e.target.value)}
        className="p-2 mb-4 mr-4 border border-green-800 rounded-xl"
      >
        <option value="">Select</option>
        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>
      <Button text="Search" onClick={handleSearch} />

      {activities.length > 0 ? (
        <div>
          <h2 className="mb-4 text-xl">Activities:</h2>
          <div className="flex justify-center gap-4 mt-4">
            {activities.map((activity) => (
              <div
                key={activity.id}
                className="relative flex flex-col w-1/3 p-2 transition-transform duration-300 ease-in-out transform bg-white border rounded-lg shadow-lg hover:scale-105 hover:shadow-xl"
              >
                <img
                  className="object-cover w-full h-auto mb-4 rounded-lg"
                  src={activity.imageUrls || "https://via.placeholder.com/150"} // Gunakan placeholder gambar yang valid
                  alt={activity.title || "Activity"}
                />
                <h2 className="text-sm font-bold text-green-500">
                  {activity.title}
                </h2>
                <p className="text-sm text-gray-600">
                  Created: {format(new Date(activity.createdAt), "dd-MM-yyyy")}
                </p>
                <p className="text-sm text-gray-600">
                  Last Updated:{" "}
                  {format(new Date(activity.updatedAt), "dd-MM-yyyy")}
                </p>
              </div>
            ))}
          </div>
        </div>
      ) : (
        error && <p className="mt-4 text-red-500">{error}</p>
      )}
    </div>
  );
};

export default Search;
