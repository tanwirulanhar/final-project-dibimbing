import { useState } from "react";
import useUpdate from "../../../../../hooks/useUpdate";
import PopupDashboard from "../../../Popup/PopUpDashboard";
import Button from "../../../Button/Button";

const UpdateRole = ({ user, onClose, onUpdate }) => {
  const { update } = useUpdate();
  const [role, setRole] = useState(user.role);
  const [popupVisible, setPopupVisible] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [popupType, setPopupType] = useState("error");

  const handleUpdateRole = async () => {
    try {
      console.log(`kirim request update role ${user.id} to ${role}`);
      const res = await update(`update-user-role/${user.id}`, { role });
      console.log("Response", res);

      if (res.status === 200) {
        setPopupMessage("Role updated successfully.");
        setPopupType("success");
        setPopupVisible(true);
        onUpdate(user.id, role); 
        setTimeout(() => {
          onClose();
        }, 2000);
      }
    } catch (error) {
      console.error(error);
      setPopupMessage("Failed to update role.");
      setPopupType("error");
      setPopupVisible(true);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative w-auto p-6 bg-white rounded-lg z-60">
        <h2 className="mb-6 text-xl font-semibold text-center text-green-700">
          Update Role
        </h2>
        <div className="flex items-center gap-10 mb-4 ">
          <div className="flex items-center gap-10 mb-4">
            <div className="flex flex-col items-center">
              <img
                src={user.profilePictureUrl}
                alt={user.name}
                className="w-16 h-16 rounded-full"
              />
              <h3 className="mt-2 font-semibold text-green-700">{user.name}</h3>
            </div>
          </div>

        
          <div className="flex items-center justify-center">
            <select
              className="text-green-600 form-select"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>
        </div>

        <div className="flex justify-center mt-4 space-x-2">
          <Button text="Confirm" onClick={handleUpdateRole}>
            Confirm
          </Button>
          <Button text="Cancel" onClick={onClose}>
            Cancel
          </Button>
        </div>
      </div>

      {popupVisible && (
        <PopupDashboard
          type={popupType}
          message={popupMessage}
          onClose={() => setPopupVisible(false)}
        />
      )}
    </div>
  );
};

export default UpdateRole;
