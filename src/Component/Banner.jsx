import { useEffect, useState } from "react";
import axios from "axios";

const Banner = () => {
  const [user, setUser] = useState([]);

  const fetchData = async () => {
    try {
      const res = await axios.get(
        `https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/banners`,
        {
          headers: { apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c" },
        }
      );
      console.log(res?.data?.data);
      setUser(res?.data?.data);
    } catch {
      console.log("error");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="h-auto mx-8 my-20 cursor-pointer ">
      <h1 className="mb-20 text-3xl font-bold text-center text-green-700">Highlight Destination</h1>
      <div className="flex gap-4 ">
        {user.map((item) => (
          <div key={item.id} className="transition duration-300 transform bg-white shadow-2xl rounded-xl hover:scale-105 hover:-translate-y-1">
            <img className="w-60 h-36 rounded-t-xl" src={item.imageUrl} alt={item.name} />
            <h1 className="mt-4 mb-8 text-center text-green-700 ">{item.name}</h1>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Banner;
