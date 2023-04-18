import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:3000", // Replace with your API base URL
  withCredentials: true,
});

axios.defaults.withCredentials = true;

export const fetchSession = async () => {
  try {
    const sid = localStorage.getItem("sid");
    console.log(" ******** sid from local storage : ", sid);
    const response = await instance.get("/v1/session");
    console.log("**** RESPONSE from session API ****** : ", response.data);
    return response;
  } catch (error) {
    throw error;
  }
};

export const fetchLogin = async (username, password) => {
  try {
    const authString = `${username}:${password}`;
    const base64AuthString = btoa(authString);
    const headers = {
      Authorization: `Basic ${base64AuthString}`,
      "Content-Type": "application/json",
    };
    const payload = { username, password };
    const response = await instance.post("/v1/session", payload, {
      withCredentials: true,
      headers,
    });
    console.log("**** RESPONSE from session API ****** : ", response.data);
    if (response.data.success) {
      localStorage.setItem("sid", response.data.sessionData.sid);
    }

    return response;
  } catch (error) {
    throw error;
  }
};

export const fetchLogOut = async () => {
  try {
    const headers = {
      "Content-Type": "application/json",
    };
    const response = await instance.delete("/v1/session", { headers });
    console.log(
      "**** RESPONSE from session DELETE API ****** : ",
      response.data
    );
    if (response.data.success) {
      localStorage.removeItem("sid");
    }
    return response;
  } catch (error) {
    throw error;
  }
};

export const fetchSignUp = async (payload) => {
  try {
    const createUserPayload = (() => {
      const defaultRole = "user";
      const role = payload.role;

      if (role !== "user" && role !== "customer") {
        return { ...payload, role: defaultRole, isVerified: false };
      } else {
        return { ...payload, isVerified: false };
      }
    })();

    const headers = {
      "Content-Type": "application/json",
    };
    console.log("FE payload : ", createUserPayload);
    const response = await instance.post("/v1/user", createUserPayload, {
      headers,
    });
    console.log("****** Response from user API POST : ", response);
    return response;
  } catch (error) {
    throw error;
  }
};
