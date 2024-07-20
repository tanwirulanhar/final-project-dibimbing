import { useEffect, useState } from "react";
import axios from "axios";
import { format } from "date-fns";
import Button from "../../Element/Button/Button";

const DashboardPromo = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 6;

  const fetchDataPromo = async () => {
    try {
      const res = await axios.get(
        "https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/promos",
        {
          headers: {
            apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
          },
        }
      );
      setData(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchDataPromo();
  }, []);

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = data.slice(indexOfFirstUser, indexOfLastUser);

  const totalPages = Math.ceil(data.length / usersPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  return (
    <div className="relative z-10 p-6 mt-2 mb-10 mr-32 bg-white shadow-2xl h-[634px] rounded-b-2xl ">
      <div className="grid grid-cols-1 gap-4 cursor-pointer sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3">
        {currentUsers.map((data) => (
          <div
            key={data.id}
            className="flex flex-col p-2 transition-transform duration-300 ease-in-out transform bg-white border rounded-lg shadow-lg hover:scale-105 hover:shadow-xl"
          >
            <img
              className="object-cover w-full h-40 mb-2 rounded-lg"
              src={data.imageUrl}
              alt="profile"
            />
            <h2 className="text-sm font-bold text-green-500">{data.title}</h2>
            <p className="text-sm text-gray-600">
              Create : {format(new Date(data.createdAt), "dd-MM-yyyy HH:mm:ss")}
            </p>
            <p className="text-sm text-gray-600">
              Last Update :{" "}
              {format(new Date(data.updatedAt), "dd-MM-yyyy HH:mm:ss")}
            </p>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-4 mb-2 space-x-2">
        <Button
          onClick={handlePrevPage}
          text="Back"
          disabled={currentPage === 1}
        ></Button>
        <Button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          text="Next"
        ></Button>
      </div>
    </div>
  );
};

export default DashboardPromo;
