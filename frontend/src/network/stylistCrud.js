import axios from "axios";

const baseUrl = `${import.meta.env.VITE_API_BASE_URL || "http://localhost:8000"}/stylist`;

export const getAll = async () => {
  try {
    const response = await axios.get(baseUrl);
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export const signUpStylist = async (body) => {
  try {
    const response = await axios.post(`${baseUrl}/signup`, body);
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export const getStylistDetails = async (id) => {
  try {
    const response = await axios.get(`${baseUrl}/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export const updateStylistDetails = async (id, body) => {
  try {
    const response = await axios.put(`${baseUrl}/${id}`, body);
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}