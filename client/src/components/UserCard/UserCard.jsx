import React from "react";
import { Flippy, FrontSide, BackSide } from "react-flippy";
import { deleteUser } from "../../apiClient";
import { useNavigate } from "react-router-dom";

const UserCard = (props) => {
  const ref = React.useRef();
  const navigate = useNavigate();
  console.log(props.data);
  let onClickingDelete = ()=>{
    deleteUser(props.data.user_id).then(response=>response.data).then(data=>{
        navigate("/account");
    })
  }
  return (
    <div className="my-3">
      <div className="container">
        <div className="row">
          <Flippy
            flipOnHover={false}
            flipOnClick={true}
            flipDirection="vertical"
            ref={ref}>
            <FrontSide
              onClick={() => {
                ref.current.toggle();
              }}>
              <div className="row">
                <div className="text-center">
                    <div className="h5">User ID: {props.data.user_id}</div>
                </div>
                <br/>
                <div className="text">
                    <div className="h6">Name: {props.data.first_name} {props.data.last_name}</div>
                </div>
                <div className="text">
                    <div className="h6">Role: {props.data.role}</div>
                </div>
                <div className="text">
                    <div className="h6">Phone Number: {props.data.phone_number}</div>
                </div>
                <div className="text">
                    <div className="h6">Number of Events: {props.data.events_booked.length}</div>
                </div>
              </div>
            </FrontSide>

            <BackSide>
              <div className="row">
                <div className="text-center">
                    <button className="btn btn-warning mx-5">Edit User</button>
                    <button className="btn btn-danger mx-5" onClick={onClickingDelete}>Delete User</button>
                </div>
              </div>
              <div className="row">
                <div className="text-center my-3">
                    <p className="p text-danger">Area to Avoid! These operations may change or delete the user data having <div className="b text-primary">User ID {props.data.user_id}</div> So be careful while performing these operations</p>
                </div>
              </div>
            </BackSide>
          </Flippy>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
