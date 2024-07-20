import { useEffect, useState } from "react";
import axios from "axios";

const GetAllUser = () => {
  const [dataAllUser, setDataAllUser] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;

  const fetchDataAllUser = async () => {
    try {
      const res = await axios.get('https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/all-user', {
        headers: {
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1pZnRhaGZhcmhhbkBnbWFpbC5jb20iLCJ1c2VySWQiOiI1Zjk2YjU4YS05MjRhLTRjOGYtOWE3Yi0wZGZlYjFmN2IwZTUiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3MjEzNzYzODV9.4pBzxvfsSbfw1ISgD0MEIrqDDIfbShaJFDEK0pDIcnA',
          apiKey: '24405e01-fbc1-45a5-9f5a-be13afcd757c'
        }
      });
      setDataAllUser(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchDataAllUser();
  }, []);

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = dataAllUser.slice(indexOfFirstUser, indexOfLastUser);

  const totalPages = Math.ceil(dataAllUser.length / usersPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(prevPage => prevPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prevPage => prevPage - 1);
    }
  };

  return (
    <div className="items-center justify-center">
      {currentUsers.map((data) => (
        <div key={data.id} className="flex items-center mb-4 space-x-4">
          <img className="w-20 h-20 rounded-full" src={data.profilePictureUrl} alt="profile" />
          <h1>{data.name}</h1>
        </div>
      ))}

      <div className="flex justify-center mt-4 space-x-2">
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          className="px-4 py-2 text-black bg-white border disabled:bg-gray-200 disabled:text-gray-500"
        >
          Back
        </button>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className="px-4 py-2 text-black bg-white border disabled:bg-gray-200 disabled:text-gray-500"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default GetAllUser;
