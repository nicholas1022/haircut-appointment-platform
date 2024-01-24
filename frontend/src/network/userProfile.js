import axios from "axios";

const baseUrl = `${import.meta.env.VITE_API_BASE_URL || "http://localhost:8000"}/customer`;

export const getUser = async (uid) => {
  try {
    const response = await axios.get(baseUrl + '/' + uid);
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}
