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
export const fetchUsers = async () => {
  try {
    const response = await instance.post("/getAllUsers/");
    return response;
  } catch (error) {
    throw error;
  }
};
export const deleteUser = async (user_id) => {
  try {
    const response = await instance.delete("/getAllUsers/delete/"+user_id);
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
  console.log("Initial Payload inside signUP : ", payload);
  try {
    const createUserPayload = (() => {
      const defaultRole = "user";
      const role = payload.role.toLowerCase();

      if (role !== "user" && role !== "admin") {
        return { ...payload, role: defaultRole, isVerified: false };
      } else {
        return { ...payload, role, isVerified: false };
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

export const fetchUserInfo = async (user_id) => {
  console.log("Hitting the User GET API for user-id : ", user_id);
  try {
    const response = await instance.get(`/v1/user/${user_id}`);
    console.log("**** RESPONSE from GET USER API ****** : ", response.data);
    return response;
  } catch (error) {
    throw error;
  }
};

export const updateUserInfo = async (user_id, payload) => {
  console.log("Hitting the PUT API for user for user-id : ", user_id);
  try {
    const headers = {
      "Content-Type": "application/json",
    };
    const response = await instance.patch(`/v1/user/${user_id}`, payload, {
      headers,
    });
    console.log(" **** RESPONSE from PUT USER API ****** : ", response.data);
    return response;
  } catch (error) {
    throw error;
  }
};

export const fetchCreateEvent = async (payload) => {
  console.log("Initial Payload inside Creating Event : ", payload);
  try {
    const headers = {
      "Content-Type": "application/json",
    };
    console.log("FE Event POST payload : ", payload);
    const response = await instance.post("/v1/event", payload, {
      headers,
    });
    console.log("****** Response from EVENT API POST : ", response);
    // const response = { data : {success : true}};
    return response;
  } catch (error) {
    throw error;
  }
};

export const getAllEvents = async () => {
  console.log("Inside GET ALL EVENTS to get all events happening");
  try {
    const response = await instance.get("/v1/event/all");
    console.log("**** RESPONSE from session API ****** : ", response.data);
    return response;
  } catch (error) {
    throw error;
  }
};
