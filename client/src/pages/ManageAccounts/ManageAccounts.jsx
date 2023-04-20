import axios from "axios";
import React, { useRef, useState } from "react";

export default function ManageAccounts() {
  let [users, setUsers] = useState([]);
  useRef(()=>{
    axios.post("http://localhost:3000/getAllUsers").then(response=>response.data).then((data)=>{
      console.log(data);
    })
  }, []);
  return <div>You are looking at ManageAccounts</div>;
}
