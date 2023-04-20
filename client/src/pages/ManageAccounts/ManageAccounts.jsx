import axios from "axios";
import React, { useEffect, useState } from "react";
import { fetchUsers } from "../../apiClient";
import UserCard from "../../components/UserCard/UserCard";

export default function ManageAccounts() {
  let [allUsers, setAllUsers] = useState([]);
  useEffect(() => {
    fetchUsers()
      .then((response) => response.data)
      .then((data) => {
        setAllUsers(data);
      });
  }, []);
  return (
    <div className="row">
      {allUsers.map((data, index) => {
        return (<div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
          <UserCard data={data} />
        </div>)
      })}
    </div>
  );
}
