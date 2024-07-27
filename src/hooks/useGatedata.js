import axios from "axios";

export default function useGetData() {
  const getData = async (url, id = '') => {
    try {
      const res = await axios.get(
        `https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/${url}${id ? `/${id}` : ''}`,
        {
          headers: { apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c" },
        }
      );
      return res;
    } catch (error) {
      console.log(error);
      throw error; // throw error untuk penanganan error di komponen
    }
  };

  return { getData };
}
