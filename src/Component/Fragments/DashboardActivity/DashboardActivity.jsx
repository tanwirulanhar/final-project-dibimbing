import { useEffect, useState } from "react";
import { format } from "date-fns";
import Button from "../../Element/Button/Button";
import update from "../../../assets/icon/Edit.png";
import hapus from "../../../assets/icon/sampah.png";
import CreateActivity from "../../Element/Modals/ModalsActivity/ModalsCreateActivity/CreateActivity";
import UpdateActivity from "../../Element/Modals/ModalsActivity/ModalsUpdateActivity/UpdateActivity";
import useDelete from "../../../hooks/useDelete";
import ConfirmDelete from "../../Element/Modals/ModalConfirmDelete/ConfirmDelete";
import PopupDashboard from "../../Element/Popup/PopUpDashboard";
import useGetData from "../../../hooks/useGatedata"; // pastikan ini benar
import Search from "../../Element/Search/Search";

const DashboardActivity = () => {
  const { getData } = useGetData();
  const [data, setData] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showCreateActivity, setShowCreateActivity] = useState(false);
  const [showUpdateActivity, setShowUpdateActivity] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [activityToDelete, setActivityToDelete] = useState(null);
  const [popupVisible, setPopupVisible] = useState(false);
  const [popupType, setPopupType] = useState("");
  const [popupMessage, setPopupMessage] = useState("");

  const activitiesPerPage = 6;
  const { deleteData } = useDelete();

  const fetchDataActivity = async () => {
    try {
      const res = await getData("activities");
      setData(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchDataActivity();
  }, []);

  const indexOfLastActivity = currentPage * activitiesPerPage;
  const indexOfFirstActivity = indexOfLastActivity - activitiesPerPage;
  const currentActivities =
    searchResults.length > 0
      ? searchResults.slice(indexOfFirstActivity, indexOfLastActivity)
      : data.slice(indexOfFirstActivity, indexOfLastActivity);

  const totalPages = Math.ceil(
    (searchResults.length > 0 ? searchResults.length : data.length) /
      activitiesPerPage
  );

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

  const handleCreateActivityOpen = () => {
    setShowCreateActivity(true);
    setPopupVisible(false);
  };

  const handleCreateActivityClose = () => {
    setShowCreateActivity(false);
    setPopupVisible(false);
    fetchDataActivity();
  };

  const handleUpdateActivityClose = () => {
    setShowUpdateActivity(false);
    setSelectedActivity(null);
    fetchDataActivity();
  };

  const handleDeleteActivity = (activity) => {
    setActivityToDelete(activity);
    setShowConfirmDelete(true);
  };

  const confirmDelete = async () => {
    if (activityToDelete && activityToDelete.id) {
      try {
        const res = await deleteData(`delete-activity/${activityToDelete.id}`);
        if (res.status === 200) {
          setPopupType("success");
          setPopupMessage("Activity berhasil dihapus.");
          fetchDataActivity();

          const updatedSearchResults = searchResults.filter(
            (activity) => activity.id !== activityToDelete.id
          );
          setSearchResults(updatedSearchResults);
        } else {
          setPopupType("error");
          setPopupMessage("Gagal menghapus activity. Status: " + res.status);
        }
        setPopupVisible(true);
      } catch (error) {
        setPopupType("error");
        setPopupMessage("Gagal menghapus activity.");
        setPopupVisible(true);
        console.error(error);
      } finally {
        setShowConfirmDelete(false);
        setActivityToDelete(null);
      }
    }
  };

  const cancelDelete = () => {
    setShowConfirmDelete(false);
    setActivityToDelete(null);
  };

  const handleEditActivity = (activity) => {
    setSelectedActivity(activity);
    setShowUpdateActivity(true);
  };

  const handleSearchResults = (results) => {
    setSearchResults(results);
    setCurrentPage(1); // Reset ke halaman pertama setelah pencarian
  };

  const handleResetSearch = () => {
    setSearchResults([]);
    setCurrentPage(1); // Reset ke halaman pertama setelah reset
  };

  return (
    <div className="relative z-10 flex flex-col justify-between w-full h-auto p-6 shadow-2xl bg-slate-100 rounded-2xl">
      <div className="flex justify-between">
        <Search onSearch={handleSearchResults} onReset={handleResetSearch} />
        <Button
          onClick={handleCreateActivityOpen}
          text="Create Activity"
          className="self-end mb-4"
        />
      </div>

      <div className="grid grid-cols-1 gap-4 mb-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3">
        {currentActivities.map((activity) => (
          <div
            key={activity.id}
            className="relative flex flex-col p-2 transition-transform duration-300 ease-in-out transform bg-white border rounded-lg shadow-lg hover:scale-105 hover:shadow-xl"
          >
            <img
              className="object-cover w-full h-40 mb-4 rounded-lg"
              src={activity.imageUrls[0] || "placeholder-image-url"}
              alt="activity"
            />
            <h2 className="text-sm font-bold text-green-500">
              {activity.title}
            </h2>
            <p className="text-sm text-gray-600">
              Created: {format(new Date(activity.createdAt), "dd-MM-yyyy")}
            </p>
            <p className="text-sm text-gray-600">
              Last Updated: {format(new Date(activity.updatedAt), "dd-MM-yyyy")}
            </p>
            <div className="absolute flex space-x-2 bottom-2 right-2">
              <img
                src={update}
                alt="edit"
                className="w-5 h-5 cursor-pointer"
                onClick={() => handleEditActivity(activity)}
              />
              <img
                src={hapus}
                alt="delete"
                className="w-5 h-5 cursor-pointer"
                onClick={() => handleDeleteActivity(activity)}
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

      {showCreateActivity && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-75">
          <div className="w-full max-w-4xl p-6 bg-white rounded-lg shadow-lg md:w-4/5">
            <h2 className="mb-4 text-2xl font-bold text-center text-green-600">
              Create Activity
            </h2>
            <CreateActivity
              onClose={handleCreateActivityClose}
              onUpdate={fetchDataActivity}
            />
          </div>
        </div>
      )}

      {showUpdateActivity && selectedActivity && (
        <div>
          <UpdateActivity
            onClose={handleUpdateActivityClose}
            onUpdate={fetchDataActivity}
            activityData={selectedActivity}
          />
        </div>
      )}

      {showConfirmDelete && (
        <ConfirmDelete
          onConfirm={confirmDelete}
          onCancel={cancelDelete}
          message={`Are you sure you want to delete this activity?`}
        />
      )}

      {popupVisible && (
        <PopupDashboard
          visible={popupVisible}
          onClose={() => setPopupVisible(false)}
          type={popupType}
          message={popupMessage}
        />
      )}
    </div>
  );
};

export default DashboardActivity;
