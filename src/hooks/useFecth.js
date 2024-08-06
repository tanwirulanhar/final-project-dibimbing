import axios from "axios";
import { useMemo } from "react";

export default function useGetData() {
  const getData = useMemo(() => {
    return async (url) => {
      try {
        const fullUrl = `https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/${url}`;
        console.log("Fetching data from URL:", fullUrl);
        
        const res = await axios.get(fullUrl, {
          headers: { apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c" },
        });

        console.log("Response received:", res.data);

      
        if (Array.isArray(res.data.data)) {
          return res.data.data;
        } else {
          console.error("Response data is not an array:", res.data);
          return []; 
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        return [];
      }
    };
  }, []);

  return { getData };
}
