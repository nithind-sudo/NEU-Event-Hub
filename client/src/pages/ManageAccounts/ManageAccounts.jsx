import axios from "axios";
import React, { useEffect, useState } from "react";
import { fetchEvents, fetchUsers } from "../../apiClient";
import UserCard from "../../components/UserCard/UserCard";

export default function ManageAccounts() {
  let [allUsers, setAllUsers] = useState([]);
  let handleUserSearch = (e) => {
    // console.log(e.target.value);
  };
  useEffect(() => {
    fetchUsers()
      .then((response) => response.data)
      .then((data) => {
        setAllUsers(data);
      });
  }, [allUsers]);
  return (
    <div>
      <div className="row">
        <div className="container">
          <div className="h4">Manage User Accounts</div>
          <input
            type="text"
            className="form-control shadow-none my-5"
            placeholder="Search Users by Name / Username / User ID"
            aria-label="searchEvents"
            aria-describedby="basic-addon1"
            onKeyUp={handleUserSearch}
          />
        </div>
      </div>
      <div className="row">
        {allUsers.map((data, index) => {
          return (
            <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
              <UserCard data={data} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
