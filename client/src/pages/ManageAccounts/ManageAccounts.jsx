import axios from "axios";
import React, { useEffect, useState } from "react";
import { fetchEvents, fetchUsers } from "../../apiClient";
import UserCard from "../../components/UserCard/UserCard";

export default function ManageAccounts() {
  let [allUsers, setAllUsers] = useState([]);
  let [userData, setUserData] = useState([]);
  let handleUserSearch = (e) => {
    if (
      e.target.value == "" ||
      e.target.value == null ||
      e.target.value == undefined
    ) {
      setUserData(allUsers);
    } else {
      let usersData = [];
      allUsers
        .filter((data) => {
          return (
            data.first_name
              .toLowerCase()
              .includes(e.target.value.toLowerCase()) ||
            data.last_name
              .toLowerCase()
              .includes(e.target.value.toLowerCase()) ||
            data.user_id.toString().includes(e.target.value.toLowerCase())
          );
        })
        .map((data) => {
          usersData.push(data);
        });
      setUserData(usersData);
    }
  };
  useEffect(() => {
    fetchUsers()
      .then((response) => response.data)
      .then((data) => {
        setAllUsers(data);
        setUserData(data);
      });
  }, [allUsers, userData]);
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
        {userData.map((data, index) => {
          return (
            <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6" key={index}>
              <UserCard data={data} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
