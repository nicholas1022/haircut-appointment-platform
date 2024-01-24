import axios from "axios";
import { auth } from "../config/firebase";

const baseUrl = `${import.meta.env.VITE_API_BASE_URL || "http://localhost:8000"}/booking`;

export const getByCust = async () => {
  const currentUser = auth.currentUser;
  const token = await currentUser.getIdToken();
  try {
    const response = await axios.get(`${baseUrl}/customer`, {
      headers: {
          'authorization': `bearer ${token}` 
      }
    });
    return response;
  } catch (error) {
    console.error(error);
    return null;
  }
}
