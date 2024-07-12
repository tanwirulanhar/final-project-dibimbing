import React, { useState, useEffect, useCallback } from "react";
import useGetData from "../../hooks/useFecth";

const Testing = () => {
  const { getData } = useGetData();
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    try {
      const response = await getData("promos");
      console.log("Response:", response); // Tambahkan ini untuk melihat response secara keseluruhan di console
      setData(response);
    } catch (err) {
      console.error("Error fetching data in component:", err);
      setError(err.message);
    }
  }, [getData]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      {data.map((item) => (
        <div key={item.id}>
          <h1>{item.name}</h1>
          <img src={item.imageUrl} alt={item.name} />
        </div>
      ))}
    </div>
  );
};

export default Testing;
