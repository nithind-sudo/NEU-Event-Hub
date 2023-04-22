import React, { useEffect, useState } from "react";
import "./MyTickets.css";
import axios from "axios";
import { fetchSession, fetchUserInfo } from "../../apiClient";
import QRCode from "qrcode.react";
import { getAllEvents } from "../../apiClient";

export default function MyTickets() {
  const [events, setEvents] = useState([]);
  const [userID, setUserID] = useState(null);
  const [allEvents, setAllEvents] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const sessionResponse = await fetchSession();
      if (sessionResponse.data.success) {
        const userProfile = await fetchUserInfo(sessionResponse.data.user_id);
        const userID = userProfile.data[0]._id;

        const paymentsInfoResponse = await axios.post(
          "http://localhost:3000/stripe/getAllPaymentsInfo",
          { userID }
        );

        const fetchAllEvents = await getAllEvents();

        setUserID(userID);
        setEvents(paymentsInfoResponse.data.reverse());
        setAllEvents(fetchAllEvents.data);
      }
    }

    fetchData();
  }, []);

  console.log(events);
  console.log(userID);
  console.log(allEvents);

  function createHashmap(events) {
    let hashmap = {};
    events.map((data, key) => {
      let hashKey = data._id;
      let hashValue = data.title;
      hashmap[hashKey] = hashValue;
    });
    return hashmap;
  }

  const hashmap = createHashmap(allEvents);

  return (
    <div>
      <div>
        <div className="container">
          <div className="row">
            {events
              .filter((data) => userID == data.user)
              .map((data, key) => {
                const eventTitle = hashmap[data.event];
                return (
                  <div
                    className="col-xs-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 p-3"
                    key={key}>
                    <div className="card h-100 text-dark makeCard">
                      <div className="card-body">
                        <h5 className="card-title">Ticket {key + 1}</h5>
                        <p className="card-text">{eventTitle}</p>
                        <ul className="list-group">
                          <li className="list-group-item">
                            <b>Transaction:</b> {data.paymentId}
                          </li>
                          <li className="list-group-item">
                            <b>Amount:</b> {data.amount}
                          </li>
                          <li className="list-group-item">
                            <b>Payment Date:</b>{" "}
                            {new Date(data.paymentDate).toDateString()}
                          </li>
                          <li className="list-group-item">
                            <b>Number of People:</b> {data.quantity}
                          </li>
                        </ul>
                        <br />
                        <div className="row">
                          <div className="text-center">
                            <QRCode value={data.paymentId} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
}
