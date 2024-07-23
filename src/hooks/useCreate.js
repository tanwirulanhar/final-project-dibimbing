import axios from "axios";

export default function useCreate() {
  const create = async (url, body) => {
    try {
      const res = await axios.post(
        `https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/${url}`,
        body,
        {
          headers: {
            apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json", // Pastikan Content-Type sesuai
          },
        }
      );
      return res;
    } catch (error) {
      console.error("API Error:", error.response ? error.response.data : error.message);
      throw error; // Lemparkan error untuk ditangani di tempat lain
    }
  };
  return { create };
}
