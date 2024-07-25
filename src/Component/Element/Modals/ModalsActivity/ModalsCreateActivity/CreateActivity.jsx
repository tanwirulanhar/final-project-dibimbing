import React, { useState, useEffect } from "react";
import useCreate from "../../../../../hooks/useCreate";
import useUpload from "../../../../../hooks/useUpload";
import PopupDashboard from "../../../Popup/PopUpDashboard";
import Button from "../../../Button/Button";
import Index from "../../../Input/Index";
import SelectOption from "../../../SelectOption/SelectOption";
import useGetData from "../../../../../hooks/useGatedata";
import iconClose from "../../../../../assets/icon/x-2.png";

const CreateActivity = ({ onClose, onUpdate, activityData }) => {
  const { create } = useCreate();
  const { upload } = useUpload();
  const { getData } = useGetData();
  const [imageUrls, setImageUrls] = useState([]);
  const [popupVisible, setPopupVisible] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [popupType, setPopupType] = useState("error");
  const [loading, setLoading] = useState(false);
  const [section, setSection] = useState(1);
  const [categoryId, setCategoryId] = useState("");
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    price_discount: "",
    rating: "",
    total_reviews: "",
    facilities: "",
    address: "",
    province: "",
    city: "",
    location_maps: "",
  });

  useEffect(() => {
    getData("categories").then((res) => {
      setCategories(res.data.data);
    });
  }, []);

  useEffect(() => {
    if (activityData) {
      setFormData({
        title: activityData.title || "",
        description: activityData.description || "",
        price: activityData.price ? Number(activityData.price) : "",
        price_discount: activityData.price_discount
          ? Number(activityData.price_discount)
          : "",
        rating: activityData.rating ? Number(activityData.rating) : "",
        total_reviews: activityData.total_reviews
          ? Number(activityData.total_reviews)
          : "",
        facilities: activityData.facilities || "",
        address: activityData.address || "",
        province: activityData.province || "",
        city: activityData.city || "",
        location_maps: activityData.location_maps || "",
      });
      setCategoryId(activityData.categoryId || "");
      setImageUrls(activityData.imageUrls || []);
    }
  }, [activityData]);

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
      setImageUrls([...imageUrls, res.data.url]);
      setPopupMessage("Gambar berhasil diunggah.");
      setPopupType("success");
      setPopupVisible(true);

      setTimeout(() => {
        setPopupVisible(false);
      }, 2000);
    } catch (error) {
      setPopupMessage("Gagal mengunggah gambar.");
      setPopupType("error");
      setPopupVisible(true);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateActivity = async (e) => {
    e.preventDefault();

    if (!categoryId) {
      setPopupMessage("Please select a category");
      setPopupType("error");
      setPopupVisible(true);
      setTimeout(() => setPopupVisible(false), 2000);
      return;
    }

    const activityData = {
      categoryId,
      ...formData,
      price: Number(formData.price),
      price_discount: Number(formData.price_discount),
      rating: Number(formData.rating),
      total_reviews: Number(formData.total_reviews),
      imageUrls,
    };

    const hasEmptyFields = Object.values(activityData).some(
      (value) => value === "" || value === null || value === 0
    );

    if (hasEmptyFields || imageUrls.length === 0) {
      setPopupMessage("Pastikan semua field terisi dan gambar diunggah.");
      setPopupType("error");
      setPopupVisible(true);
      setTimeout(() => setPopupVisible(false), 2000);
      return;
    }

    try {
      const res = await create("create-activity", activityData);
      if (res.status === 200) {
        setPopupMessage("Aktivitas berhasil dibuat.");
        setPopupType("success");
        setPopupVisible(true);
        onUpdate();
        setTimeout(() => {
          setPopupVisible(false);
          onClose();
        }, 2000);
      } else {
        setPopupMessage("Gagal membuat aktivitas. Status: " + res.status);
        setPopupType("error");
        setPopupVisible(true);
        setTimeout(() => setPopupVisible(false), 2000);
      }
    } catch (error) {
      setPopupMessage("Gagal membuat aktivitas.");
      setPopupType("error");
      setPopupVisible(true);
      setTimeout(() => setPopupVisible(false), 2000);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]:
        name === "price" ||
        name === "price_discount" ||
        name === "rating" ||
        name === "total_reviews"
          ? Number(value)
          : value,
    });
  };

  const handleClose = () => {
    onClose();
  };

  const renderSection = () => {
    switch (section) {
      case 1:
        return (
          <>
            <div className="flex gap-3">
              <div className="w-1/2">
                <div className="mb-4">
                  <Index
                    deskripsi="Title"
                    name="title"
                    type="text"
                    placeholder="Enter activity title"
                    className="w-full"
                    value={formData.title}
                    onChange={handleChange}
                    required
                  />
                  <label
                    htmlFor="categoryId"
                    className="font-semibold text-green-600"
                  >
                    Category
                  </label>
                  <SelectOption
                    selectItems={categories}
                    id="categoryId"
                    value={categoryId}
                    onChange={(e) => setCategoryId(e.target.value)}
                  />
                  <label
                    htmlFor="description"
                    className="font-semibold text-green-600"
                  >
                    Description
                  </label>
                  <textarea
                    name="description"
                    id="description"
                    placeholder="Enter activity description"
                    className="w-full p-2 border border-green-500 rounded-md"
                    rows="2"
                    value={formData.description}
                    onChange={handleChange}
                    required
                  />
                  <Index
                    deskripsi="Price"
                    name="price"
                    type="number"
                    placeholder="Enter price"
                    className="w-full"
                    value={formData.price}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="w-1/2">
                <Index
                  deskripsi="Discounted Price"
                  name="price_discount"
                  type="number"
                  placeholder="Enter discounted price"
                  className="w-full"
                  value={formData.price_discount}
                  onChange={handleChange}
                  required
                />
                <Index
                  deskripsi="Rating"
                  name="rating"
                  type="number"
                  placeholder="Enter rating"
                  className="w-full"
                  value={formData.rating}
                  onChange={handleChange}
                  required
                />
                <Index
                  deskripsi="Total Reviews"
                  name="total_reviews"
                  type="number"
                  placeholder="Enter total reviews"
                  className="w-full"
                  value={formData.total_reviews}
                  onChange={handleChange}
                  required
                />
                <Index
                  deskripsi="Facilities"
                  name="facilities"
                  type="text"
                  placeholder="Enter facilities"
                  className="w-full"
                  value={formData.facilities}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="flex justify-end mt-4">
              <Button onClick={() => setSection(2)} text="Next" />
            </div>
          </>
        );
      case 2:
        return (
          <>
            <div className="flex gap-3">
              <div className="w-1/2">
                <Index
                  deskripsi="Address"
                  name="address"
                  type="text"
                  placeholder="Enter address"
                  className="w-full"
                  value={formData.address}
                  onChange={handleChange}
                  required
                />
                <Index
                  deskripsi="Province"
                  name="province"
                  type="text"
                  placeholder="Enter province"
                  className="w-full"
                  value={formData.province}
                  onChange={handleChange}
                  required
                />
                <Index
                  deskripsi="City"
                  name="city"
                  type="text"
                  placeholder="Enter city"
                  className="w-full"
                  value={formData.city}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="w-1/2">
                <label
                  htmlFor="location_maps"
                  className="font-semibold text-green-600 "
                >
                  Location Maps
                </label>
                <textarea
                  name="location_maps"
                  id="location_maps"
                  placeholder="Enter location maps"
                  className="w-full p-2 mt-2 border border-green-500 rounded-md"
                  rows="2"
                  value={formData.location_maps}
                  onChange={handleChange}
                  required
                />
                <div className="flex gap-4">
                  <div className="flex gap-4 mt-4">
                    <div className="w-1/2">
                      <input
                        type="file"
                        onChange={handleImageUpload}
                        className="w-full"
                        accept="image/*"
                      />
                    </div>
                  </div>
                  <div className="mt-4 ">
                    {imageUrls.map((url, index) => (
                      <img
                        key={index}
                        src={url}
                        alt="Uploaded"
                        className="object-cover w-24 h-24 rounded-md"
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-between mt-4">
              <Button onClick={() => setSection(1)} text="Back" />
              <Button onClick={handleCreateActivity} text="Submit" />
            </div>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-75 bg-black-800">
      <div className="relative w-full max-w-4xl p-6 bg-white rounded-lg shadow-lg md:w-4/5">
        <button onClick={handleClose} className="absolute p-2 top-2 right-2">
          <img src={iconClose} alt="Close" className="w-6 h-6" />
        </button>

        <h2 className="mb-4 text-2xl font-bold text-center text-green-600">
          Create Activity
        </h2>

        {renderSection()}
        {popupVisible && (
          <PopupDashboard
            type={popupType}
            message={popupMessage}
            onClose={() => setPopupVisible(false)}
          />
        )}
      </div>
    </div>
  );
};

export default CreateActivity;
