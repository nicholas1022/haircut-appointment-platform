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
  
export const getAll = async () => {
  try {
    console.log("get all");
    const response = await axios.get(baseUrl);
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export const signUpUser = async (body) => {
  try {
    console.log(body);
    console.log("sign up");

    await axios.post(`${baseUrl}/signup`, body)
    .then((response) => {
        console.log(response.data);
        return response.data;
      })
      .catch(error => console.warn(error));

  } catch (error) {
    console.error(error);
    return null;
  }
}

export const getUserDetails = async (id) => {
  try {
    console.log("get user");
    const response = await axios.get(`${baseUrl}/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export const updateUserDetails = async (id, body) => {
  try {
    console.log("update user");
    const response = await axios.put(`${baseUrl}/${id}`, body);
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}