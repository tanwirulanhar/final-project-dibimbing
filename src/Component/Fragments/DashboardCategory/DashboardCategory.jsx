import { useEffect, useState } from "react";
import axios from "axios";
import { format } from "date-fns";
import Button from "../../Element/Button/Button";
import update from "../../../assets/icon/Edit.png";
import hapus from "../../../assets/icon/sampah.png";
import CreateCategory from "../../Element/Modals/ModalsCategory/CreateCategory/CreateCategory";
import UpdateCategory from "../../Element/Modals/ModalsCategory/UpdateCategory/UpdateCategory";
import useDelete from "../../../hooks/useDelete";
import ConfirmDelete from "../../Element/Modals/ModalConfirmDelete/ConfirmDelete";

const DashboardCategory = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showCreateCategory, setShowCreateCategory] = useState(false);
  const [showUpdateCategory, setShowUpdateCategory] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState(null);
  const itemsPerPage = 6;

  const { deleteData } = useDelete();

  const fetchDataCategory = async () => {
    try {
      const res = await axios.get(
        "https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/categories",
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
    fetchDataCategory();
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(data.length / itemsPerPage);

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

  const handleCreateCategoryClose = () => {
    setShowCreateCategory(false);
    fetchDataCategory();
  };

  const handleUpdateCategoryClose = () => {
    setShowUpdateCategory(false);
    setSelectedCategory(null);
    fetchDataCategory();
  };

  const handleDeleteCategory = (category) => {
    setCategoryToDelete(category);
    setShowConfirmDelete(true);
  };

  const confirmDelete = async () => {
    if (categoryToDelete && categoryToDelete.id) {
      try {
        const res = await deleteData(`delete-category/${categoryToDelete.id}`);
        if (res.status === 200) {
          console.log("Kategori berhasil dihapus.");
          fetchDataCategory();
        } else {
          console.error("Gagal menghapus kategori. Status: " + res.status);
        }
      } catch (error) {
        console.error("Gagal menghapus kategori.");
        console.error(error);
      } finally {
        setShowConfirmDelete(false);
        setCategoryToDelete(null);
      }
    }
  };

  const cancelDelete = () => {
    setShowConfirmDelete(false);
    setCategoryToDelete(null);
  };

  const handleEditCategory = (category) => {
    setSelectedCategory(category);
    setShowUpdateCategory(true);
  };

  return (
    <div className="sticky z-10 flex flex-col justify-between h-screen p-4 mt-2 shadow-2xl bg-slate-100 rounded-2xl">
      <Button
        onClick={() => setShowCreateCategory(true)}
        text="Create Category"
        className="self-end mb-4"
      />

      <div  className="flex-grow px-2 pt-10 overflow-y-auto scrollbar-hide">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {currentItems.map((data) => (
            <div
              key={data.id}
              className="relative flex flex-col p-2 transition-transform duration-300 ease-in-out transform bg-white border rounded-lg shadow-lg hover:scale-105 hover:shadow-xl"
            >
              <img
                className="object-cover w-full h-40 mb-4 rounded-lg"
                src={data.imageUrl}
                alt="category"
              />
              <h2 className="text-sm font-bold text-green-500">{data.name}</h2>
              <p className="text-sm text-gray-600">
                Created: {format(new Date(data.createdAt), "dd-MM-yyyy")}
              </p>
              <p className="text-sm text-gray-600">
                Last Updated: {format(new Date(data.updatedAt), "dd-MM-yyyy")}
              </p>
              <div className="absolute flex space-x-2 bottom-2 right-2">
                <img
                  src={update}
                  alt="edit"
                  className="w-5 h-5 cursor-pointer"
                  onClick={() => handleEditCategory(data)}
                />
                <img
                  src={hapus}
                  alt="delete"
                  className="w-5 h-5 cursor-pointer"
                  onClick={() => handleDeleteCategory(data)}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-4 mb-2 space-x-2">
          <Button
            onClick={handlePrevPage}
            text="Back"
            disabled={currentPage === 1}
          />
          <Button
            onClick={handleNextPage}
            text="Next"
            disabled={currentPage === totalPages}
          />
        </div>

        {showCreateCategory && (
          <CreateCategory
            onClose={handleCreateCategoryClose}
            onUpdate={fetchDataCategory}
          />
        )}

        {showUpdateCategory && selectedCategory && (
          <UpdateCategory
            onClose={handleUpdateCategoryClose}
            onUpdate={fetchDataCategory}
            categoryData={selectedCategory}
          />
        )}

        {showConfirmDelete && (
          <ConfirmDelete
            onConfirm={confirmDelete}
            onCancel={cancelDelete}
            message={`Are you sure you want to delete this category?`}
          />
        )}
      </div>
    </div>
  );
};

export default DashboardCategory;
