import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:3000", // Replace with your API base URL
});

export const login = async (username, password) => {
  try {
    const authString = `${username}:${password}`;
    const base64AuthString = btoa(authString);
    const headers = {
      Authorization: `Basic ${base64AuthString}`,
      "Content-Type": "application/json",
    };
    const payload = { username, password}
    const response = await instance.post("/v1/session", payload, {headers});
    console.log("**** RESPONSE from session API ****** : ", response.data);
    return response;
  } catch (error) {
    throw error;
  }
};

export const signUp = async (payload) => {
  try{
    const createUserPayload = {...payload, role : "user", isVerified : false}
    const headers = {
      "Content-Type": "application/json",
    }
    console.log("FE payload : ", createUserPayload);
    const response = await instance.post("/v1/user", createUserPayload, {headers});
    console.log("****** Response from user API POST : ", response);
    return response
  }catch(error){
    throw error;
  }
}
