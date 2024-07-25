import { useEffect, useState } from "react";
import axios from "axios";
import Button from "../../Element/Button/Button";
import update from "../../../assets/icon/Edit.png";
import UpdateRole from "../../Element/Modals/ModalsUser/ModalsUpdateRole/UpdateRole";

const CardUser = () => {
  const [dataAllUser, setDataAllUser] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const usersPerPage = 6;

  const fetchDataAllUser = async () => {
    try {
      const res = await axios.get(
        "https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/all-user",
        {
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1pZnRhaGZhcmhhbkBnbWFpbC5jb20iLCJ1c2VySWQiOiI1Zjk2YjU4YS05MjRhLTRjOGYtOWE3Yi0wZGZlYjFmN2IwZTUiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3MjEzNzYzODV9.4pBzxvfsSbfw1ISgD0MEIrqDDIfbShaJFDEK0pDIcnA",
            apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
          },
        }
      );
      setDataAllUser(res.data.data);
      console.log(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchDataAllUser();
  }, []);

  const handleRoleUpdate = (userId, newRole) => {
    setDataAllUser(prevData =>
      prevData.map(user =>
        user.id === userId ? { ...user, role: newRole } : user
      )
    );
  };

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = dataAllUser.slice(indexOfFirstUser, indexOfLastUser);

  const totalPages = Math.ceil(dataAllUser.length / usersPerPage);

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

  const handleEditClick = (user) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedUser(null);
  };

  return (
    <div className="relative z-10 flex flex-col justify-between p-6 mt-2 mb-10 mr-32 shadow-2xl bg-slate-100 h-634 rounded-2xl ">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3">
        {currentUsers.map((data) => (
          <div
            key={data.id}
            className="relative flex flex-col p-2 transition-transform duration-300 ease-in-out transform bg-white border rounded-lg shadow-lg hover:scale-105 hover:shadow-xl"
          >
            <img
              className="object-cover w-full h-40 mb-2 rounded-lg"
              src={data.profilePictureUrl}
              alt="profile"
            />
            <div className="flex justify-between">
              <div className="">
                <h2 className="text-sm font-semibold">{data.name}</h2>
                <p className="text-sm text-gray-600">{data.email}</p>
                <p className="text-sm text-gray-600">{data.phoneNumber}</p>
              </div>
              <p className="text-sm font-bold text-green-500">{data.role}</p>
            </div>
            <div className="absolute flex space-x-2 bottom-2 right-2">
              <img
                src={update}
                alt="edit"
                className="w-5 h-5 cursor-pointer"
                onClick={() => handleEditClick(data)}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-4 space-x-2">
        <Button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          text="Back"
        ></Button>
        <Button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          text="Next"
        ></Button>
      </div>

      {showModal && selectedUser && (
        <UpdateRole user={selectedUser} onClose={handleCloseModal} onUpdate={handleRoleUpdate} />
      )}
    </div>
  );
};

export default CardUser;
