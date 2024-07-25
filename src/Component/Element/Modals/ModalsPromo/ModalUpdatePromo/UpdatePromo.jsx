import React, { useState } from "react";
import useUpdate from "../../../../../hooks/useUpdate";
import useUpload from "../../../../../hooks/useUpload";
import PopupDashboard from "../../../Popup/PopUpDashboard";
import Button from "../../../Button/Button";
import Index from "../../../Input/Index";


const UpdatePromo = ({ onClose, onUpdate, promoData }) => {
  const { update } = useUpdate();
  const { upload } = useUpload();
  const [imagePromoUrl, setImagePromoUrl] = useState(promoData.imageUrl);
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
      setImagePromoUrl(res.data.url);
      setPopupMessage("");
    } catch (error) {
      setPopupMessage("Gagal mengunggah gambar. Coba gambar lain.");
      setPopupType("error");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdatePromo = async (e) => {
    e.preventDefault();

    if (!promoData.id) {
      setPopupMessage("ID promo tidak ditemukan.");
      setPopupType("error");
      setPopupVisible(true);
      return;
    }



    const updatedPromoData = {
      title: e.target.title.value,
      description: e.target.description.value,
      imageUrl: imagePromoUrl,
      terms_condition: e.target.terms_condition.value,
      promo_code: e.target.promo_code.value,
      promo_discount_price: Number(e.target.promo_discount_price.value),
      minimum_claim_price: Number(e.target.minimum_claim_price.value),
    };

    try {
      const res = await update(`update-promo/${promoData.id}`, updatedPromoData);
      console.log("API Response", res);

      if (res.status === 200) {
        setPopupMessage("Promo berhasil diperbarui.");
        setPopupType("success");
        setPopupVisible(true);
        onUpdate();

        setTimeout(() => {
          setPopupVisible(false);
          onClose();
        }, 2000);
      } else {
        setPopupMessage("Gagal memperbarui promo. Status: " + res.status);
        setPopupType("error");
        setPopupVisible(true);
      }
    } catch (error) {
      setPopupMessage("Gagal memperbarui promo.");
      setPopupType("error");
      console.error("API Response AxiosError", error);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center pt-32 pb-10 bg-black bg-opacity-50">
      <div className="w-2/3 h-auto p-10 mt-10 mb-10 bg-white rounded-lg z-60">
        <h2 className="mb-6 text-2xl font-bold text-center text-green-700">
          Update Promo
        </h2>
        <form onSubmit={handleUpdatePromo} className="w-full">
          <div className="flex gap-3">
            <div className="flex flex-col w-full gap-3 md:w-1/2">
              <Index
                deskripsi="Title"
                name="title"
                type="text"
                defaultValue={promoData.title}
                placeholder="Enter title"
                required
              />
              <Index
                deskripsi="Promo Discount Price"
                name="promo_discount_price"
                type="number"
                defaultValue={promoData.promo_discount_price}
                placeholder="Enter promo discount price"
                required
              />
              <Index
                deskripsi="Promo Code"
                name="promo_code"
                type="text"
                defaultValue={promoData.promo_code}
                placeholder="Enter promo code"
                required
              />
              <Index
                deskripsi="Minimum Claim Price"
                name="minimum_claim_price"
                type="number"
                defaultValue={promoData.minimum_claim_price}
                placeholder="Enter minimum claim price"
                required
              />
              <Index
                deskripsi="Terms & Conditions"
                name="terms_condition"
                defaultValue={promoData.terms_condition}
                placeholder="Enter terms & conditions"
                required
              />
            </div>
            <div className="flex flex-col w-full gap-3 md:w-1/2">
              <div className="flex flex-col gap-2">
                <label htmlFor="description" className="font-semibold text-green-600">
                  Description
                </label>
                <textarea
                  name="description"
                  placeholder="Enter description"
                  defaultValue={promoData.description}
                  required
                  className="w-full px-3 py-2 border border-green-500 rounded-lg"
                />
              </div>
              <div className="flex flex-col gap-2">
                <Index
                  deskripsi="Upload Image"
                  name="image"
                  type="file"
                  onChange={handleImageUpload}
                />
                {imagePromoUrl && (
                  <div className="flex justify-center mt-2">
                    <img
                      src={imagePromoUrl}
                      alt="Uploaded"
                      className="object-cover w-32 h-32 rounded-xl"
                    />
                  </div>
                )}
                <p className="text-center">{loading ? "Loading..." : ""}</p>
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

export default UpdatePromo;
