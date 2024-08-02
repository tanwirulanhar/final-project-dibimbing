import React, { useState } from "react";
import useCreate from "../../../../../hooks/useCreate";
import useUpload from "../../../../../hooks/useUpload";
import PopupDashboard from "../../../Popup/PopUpDashboard";
import Button from "../../../Button/Button";
import Index from "../../../Input/Index";

const CreateCategory = ({ onClose, onUpdate }) => {
  const { create } = useCreate();
  const { upload } = useUpload();
  const [imageCategoryUrl, setImageCategoryUrl] = useState(null);
  const [popupVisible, setPopupVisible] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [popupType, setPopupType] = useState("error");
  const [loading, setLoading] = useState(false);

  const handleImageUpload = async (event) => {
    event.preventDefault();
    setLoading(true);
    const file = event.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setPopupMessage("File harus berupa gambar.");
      setPopupType("error");
      setPopupVisible(true);
      setLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await upload("upload-image", formData);
      setImageCategoryUrl(res.data.url);
      setPopupMessage(null);
    } catch (error) {
      setPopupMessage("Gagal mengunggah gambar.");
      setPopupType("error");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateCategory = async (e) => {
    e.preventDefault();

    const categoryData = {
      name: e.target.name.value,
      imageUrl: imageCategoryUrl,
    };

    try {
      const res = await create("create-category", categoryData);
      console.log("API Response", res);

      if (res.status === 200) {
        setPopupMessage("Kategori berhasil dibuat.");
        setPopupType("success");
        setPopupVisible(true);
        onUpdate();
        setTimeout(() => {
          setPopupVisible(false);
          onClose();
        }, 2000);
      } else {
        setPopupMessage("Gagal membuat kategori. Status: " + res.status);
        setPopupType("error");
        setPopupVisible(true);
      }
    } catch (error) {
      setPopupMessage("Gagal membuat kategori.");
      setPopupType("error");
      console.error(error);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-6 pt-32 pb-10 bg-black bg-opacity-50 lg:px-10">
      <div className="w-auto h-auto p-10 mt-10 mb-10 bg-white rounded-lg z-60">
        <h2 className="mb-6 text-2xl font-bold text-center text-green-700">
          Create Category
        </h2>
        <form onSubmit={handleCreateCategory} className="w-full">
          <div className="flex flex-col gap-3">
            <Index
              deskripsi="Name"
              name="name"
              type="text"
              placeholder="Enter category name"
              className="w-full"
              required
            />
            <div className="flex flex-col gap-2">
              <label htmlFor="image" className="font-semibold text-green-600">
                Upload Image
              </label>
              <div className="flex gap-4">
                <input
                  type="file"
                  name="image"
                  onChange={handleImageUpload}
                  className="w-full p-2 border border-green-500 rounded-md"
                  required
                />
                {imageCategoryUrl && (
                  <div className="relative flex items-center justify-center w-32 h-32 rounded-xl">
                    <img
                      src={imageCategoryUrl}
                      alt="Uploaded"
                      className="object-cover w-full h-full rounded-xl"
                    />
                  </div>
                )}
              </div>
            </div>
            <p className="text-center">{loading ? "Loading..." : ""}</p>
            <div className="flex justify-center mt-4 space-x-4">
              <Button type="submit" text="Create" disabled={loading} />
              <Button
                onClick={onClose}
                text="Close"
                className="text-green-500 bg-red-500 hover:bg-red-600"
              />
            </div>
          </div>
        </form>
        {popupVisible && (
          <PopupDashboard
            message={popupMessage}
            type={popupType}
            onClose={() => setPopupVisible(false)}
          />
        )}
      </div>
    </div>
  );
};

export default CreateCategory;
