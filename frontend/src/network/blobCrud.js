import axios from "axios";

const baseUrl = `${import.meta.env.VITE_API_BASE_URL || "http://localhost:8000"}/blob`;

export const createBlob = async (body) => {
  try {
    const response = await axios.post(baseUrl, body);
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export const getBlobs = async (ids, type) => {
  try {
    const response = await axios.get(baseUrl, {
      headers: {"Content-Type": "application/json"},
      params: {ids, type}
    });
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}
