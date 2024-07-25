import { useEffect, useState } from "react";
import axios from "axios";
import { format } from "date-fns";
import Button from "../../Element/Button/Button";
import update from "../../../assets/icon/Edit.png";
import hapus from "../../../assets/icon/sampah.png";
import CreatePromo from "../../Element/Modals/ModalsPromo/ModalCreatePromo/CreatePromo";
import UpdatePromo from "../../Element/Modals/ModalsPromo/ModalUpdatePromo/UpdatePromo";
import useDelete from "../../../hooks/useDelete"; 
import ConfirmDelete from "../../Element/Modals/ModalConfirmDelete/ConfirmDelete";

const DashboardPromo = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showCreatePromo, setShowCreatePromo] = useState(false);
  const [showUpdatePromo, setShowUpdatePromo] = useState(false);
  const [selectedPromo, setSelectedPromo] = useState(null);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [promoToDelete, setPromoToDelete] = useState(null);
  const usersPerPage = 6;

  const { deleteData } = useDelete(); 

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

  const handleCreatePromoClose = () => {
    setShowCreatePromo(false);
    fetchDataPromo();
  };

  const handleUpdatePromoOpen = (promo) => {
    setSelectedPromo(promo);
    setShowUpdatePromo(true);
  };

  const handleUpdatePromoClose = () => {
    setShowUpdatePromo(false);
    fetchDataPromo();
  };

  const handleDeletePromo = (promo) => {
    setPromoToDelete(promo);
    setShowConfirmDelete(true);
  };

  const confirmDelete = async () => {
    if (promoToDelete && promoToDelete.id) {
      try {
        const res = await deleteData(`delete-promo/${promoToDelete.id}`);
        if (res.status === 200) {
          console.log("Promo berhasil dihapus.");
          fetchDataPromo();
        } else {
          console.error("Gagal menghapus promo. Status: " + res.status);
        }
      } catch (error) {
        console.error("Gagal menghapus promo.");
        console.error(error);
      } finally {
        setShowConfirmDelete(false);
        setPromoToDelete(null);
      }
    }
  };

  const cancelDelete = () => {
    setShowConfirmDelete(false);
    setPromoToDelete(null);
  };

  return (
    <div className="relative z-10 flex flex-col justify-between h-auto p-6 mt-2 mb-10 mr-32 shadow-2xl bg-slate-100 rounded-2xl">
      <Button
        onClick={() => setShowCreatePromo(true)}
        text="Create Promo"
        className="self-end mb-4"
      />
      
      <div className="grid grid-cols-1 gap-4 mb-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3">
        {currentUsers.map((data) => (
          <div
            key={data.id}
            className="relative flex flex-col p-2 transition-transform duration-300 ease-in-out transform bg-white border rounded-lg shadow-lg hover:scale-105 hover:shadow-xl"
          >
            <img
              className="object-cover w-full h-40 mb-4 rounded-lg"
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
            <div className="absolute flex space-x-2 bottom-2 right-2">
              <img src={update} alt="edit" className="w-5 h-5 cursor-pointer" onClick={() => handleUpdatePromoOpen(data)} />
              <img src={hapus} alt="delete" className="w-5 h-5 cursor-pointer" onClick={() => handleDeletePromo(data)} />
            </div>
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

      {showCreatePromo && (
        <CreatePromo onClose={handleCreatePromoClose} onUpdate={fetchDataPromo} />
      )}
      
      {showUpdatePromo && selectedPromo && (
        <UpdatePromo onClose={handleUpdatePromoClose} onUpdate={fetchDataPromo} promoData={selectedPromo} />
      )}

      {showConfirmDelete && promoToDelete && (
        <ConfirmDelete
          promoName={promoToDelete.title}
          onConfirm={confirmDelete}
          onCancel={cancelDelete}
        />
      )}
    </div>
  );
};

export default DashboardPromo;
