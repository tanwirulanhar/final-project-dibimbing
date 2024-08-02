import React, { useState } from "react";
import useUpdate from "../../../../../hooks/useUpdate";
import useUpload from "../../../../../hooks/useUpload";
import PopupDashboard from "../../../Popup/PopUpDashboard";
import Button from "../../../Button/Button";
import Index from "../../../Input/Index";

const UpdateCategory = ({ onClose, onUpdate, categoryData }) => {
  const { update } = useUpdate();
  const { upload } = useUpload();
  const [imageCategoryUrl, setImageCategoryUrl] = useState(categoryData.imageUrl);
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
      setPopupMessage("File harus berupa gambar dengan format JPEG, PNG, GIF, BMP, atau TIFF.");
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
      setPopupMessage("");
    } catch (error) {
      setPopupMessage("Gagal mengunggah gambar. Coba gambar lain.");
      setPopupType("error");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateCategory = async (e) => {
    e.preventDefault();

    if (!categoryData.id) {
      setPopupMessage("ID kategori tidak ditemukan.");
      setPopupType("error");
      setPopupVisible(true);
      return;
    }

    const updatedCategoryData = {
      name: e.target.name.value,
      imageUrl: imageCategoryUrl,
    };

    try {
      const res = await update(`update-category/${categoryData.id}`, updatedCategoryData);
      console.log("API Response", res);

      if (res.status === 200) {
        setPopupMessage("Kategori berhasil diperbarui.");
        setPopupType("success");
        setPopupVisible(true);
        onUpdate();

        setTimeout(() => {
          setPopupVisible(false);
          onClose();
        }, 2000);
      } else {
        setPopupMessage("Gagal memperbarui kategori. Status: " + res.status);
        setPopupType("error");
        setPopupVisible(true);
      }
    } catch (error) {
      setPopupMessage("Gagal memperbarui kategori.");
      setPopupType("error");
      console.error("API Response AxiosError", error);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-6 bg-black bg-opacity-50 lg:px-10">
      <div className="w-full max-w-lg p-10 mt-20 bg-white rounded-lg shadow-lg">
        <h2 className="mb-6 text-2xl font-bold text-center text-green-700">
          Update Category
        </h2>
        <form onSubmit={handleUpdateCategory} className="w-full">
          <div className="flex flex-col gap-3">
            <div className="flex w-full gap-3">
              <Index
                deskripsi="Name"
                name="name"
                type="text"
                defaultValue={categoryData.name}
                placeholder="Enter category name"
                className="w-full"
                required
              />
            </div>
            <div className="flex flex-col w-full gap-3">
              <div className="flex flex-col gap-2">
                <label htmlFor="image" className="font-semibold text-green-600">
                  Upload Image
                </label>
                <div className="flex flex-col gap-2">
                  <input
                    type="file"
                    name="image"
                    onChange={handleImageUpload}
                    className="w-full p-2 border border-green-800 rounded-md"
                  />
                  {imageCategoryUrl && (
                    <div className="flex justify-center mt-2 rounded-xl">
                      <img
                        src={imageCategoryUrl}
                        alt="Uploaded"
                        className="object-cover w-full h-40 rounded-xl"
                      />
                    </div>
                  )}
                  <p className="text-center">{loading ? "Loading..." : ""}</p>
                </div>
              </div>
              <div className="flex justify-center mt-4 space-x-4">
                <Button
                  type="submit"
                  text="Update"
                  disabled={loading}
                />
                <Button
                  onClick={onClose}
                  text="Close"
                  className="text-green-500 bg-red-500 hover:bg-red-600"
                />
              </div>
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

export default UpdateCategory;
