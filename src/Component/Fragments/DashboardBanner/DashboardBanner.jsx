import { useEffect, useState } from "react";
import axios from "axios";
import { format } from "date-fns";
import Button from "../../Element/Button/Button";
import update from "../../../assets/icon/Edit.png";
import hapus from "../../../assets/icon/sampah.png";
import CreateBanner from "../../Element/Modals/ModalsBanner/ModalsCreateBanner/CreateBanner";
import UpdateBanner from "../../Element/Modals/ModalsBanner/ModalsUpdateBanner/UpdateBanner";
import useDelete from "../../../hooks/useDelete";
import ConfirmDelete from "../../Element/Modals/ModalConfirmDelete/ConfirmDelete";

const DashboardBanner = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showCreateBanner, setShowCreateBanner] = useState(false);
  const [showUpdateBanner, setShowUpdateBanner] = useState(false);
  const [selectedBanner, setSelectedBanner] = useState(null);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [bannerToDelete, setBannerToDelete] = useState(null);
  const usersPerPage = 6;

  const { deleteData } = useDelete();

  const fetchDataBanner = async () => {
    try {
      const res = await axios.get(
        "https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/banners",
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
    fetchDataBanner();
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

  const handleCreateBannerClose = () => {
    setShowCreateBanner(false);
    fetchDataBanner();
  };

  const handleUpdateBannerClose = () => {
    setShowUpdateBanner(false);
    setSelectedBanner(null);
    fetchDataBanner();
  };

  const handleDeleteBanner = (banner) => {
    setBannerToDelete(banner);
    setShowConfirmDelete(true);
  };

  const confirmDelete = async () => {
    if (bannerToDelete && bannerToDelete.id) {
      try {
        const res = await deleteData(`delete-banner/${bannerToDelete.id}`);
        if (res.status === 200) {
          console.log("Banner berhasil dihapus.");
          fetchDataBanner();
        } else {
          console.error("Gagal menghapus banner. Status: " + res.status);
        }
      } catch (error) {
        console.error("Gagal menghapus banner.");
        console.error(error);
      } finally {
        setShowConfirmDelete(false);
        setBannerToDelete(null);
      }
    }
  };

  const cancelDelete = () => {
    setShowConfirmDelete(false);
    setBannerToDelete(null);
  };

  const handleEditBanner = (banner) => {
    setSelectedBanner(banner);
    setShowUpdateBanner(true);
  };

  return (
    <div className="sticky z-10 flex flex-col justify-between h-screen p-4 mt-2 shadow-2xl bg-slate-100 rounded-2xl">
      <Button
        onClick={() => setShowCreateBanner(true)}
        text="Create Banner"
        className="self-end mb-4"
      />

      <div className="flex-grow px-2 pt-10 overflow-y-auto scrollbar-hide">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {currentUsers.map((banner) => (
            <div
              key={banner.id}
              className="relative flex flex-col p-2 transition-transform duration-300 ease-in-out bg-white border rounded-lg shadow-lg hover:scale-105 hover:shadow-xl"
            >
              <img
                className="object-cover w-full h-40 mb-4 rounded-lg"
                src={banner.imageUrl}
                alt="banner"
              />
              <div className="flex flex-col p-2 space-y-2 overflow-y-auto max-h-32">
                <h2 className="text-sm font-bold text-green-500 truncate">{banner.name}</h2>
                <p className="text-xs text-gray-600">
                  Created: {format(new Date(banner.createdAt), "dd-MM-yyyy")}
                </p>
                <p className="text-xs text-gray-600">
                  Last Updated: {format(new Date(banner.updatedAt), "dd-MM-yyyy")}
                </p>
              </div>
              <div className="absolute flex space-x-2 bottom-2 right-2">
                <img
                  src={update}
                  alt="edit"
                  className="w-5 h-5 cursor-pointer"
                  onClick={() => handleEditBanner(banner)}
                />
                <img
                  src={hapus}
                  alt="delete"
                  className="w-5 h-5 cursor-pointer"
                  onClick={() => handleDeleteBanner(banner)}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-center mt-4 mb-2 space-x-2">
        <Button
          onClick={handlePrevPage}
          text="Back"
          disabled={currentPage === 1}
          className="px-4 py-2"
        />
        <Button
          onClick={handleNextPage}
          text="Next"
          disabled={currentPage === totalPages}
          className="px-4 py-2"
        />
      </div>

      {showCreateBanner && (
        <CreateBanner onClose={handleCreateBannerClose} onUpdate={fetchDataBanner} />
      )}

      {showUpdateBanner && selectedBanner && (
        <UpdateBanner
          onClose={handleUpdateBannerClose}
          onUpdate={fetchDataBanner}
          bannerData={selectedBanner}
        />
      )}

      {showConfirmDelete && (
        <ConfirmDelete
          onConfirm={confirmDelete}
          onCancel={cancelDelete}
          message={`Are you sure you want to delete this banner?`}
        />
      )}
    </div>
  );
};

export default DashboardBanner;
