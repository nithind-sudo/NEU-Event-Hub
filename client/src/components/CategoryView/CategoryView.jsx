import React, { useEffect, useState } from "react";
import "./styles/Category.css";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoffee } from "@fortawesome/free-solid-svg-icons";

const CategoryView = () => {
  var [eventCategories, setEventCategories] = useState([]);
  var [eventLinks, setEventLinks] = useState([]);
  let eventCategoryURL = "http://localhost:4565/category/getCategories";

  useEffect(() => {
    axios
      .get(eventCategoryURL)
      .then((response) => response.data)
      .then((data) => {
        setEventCategories(data.categories);
        setEventLinks(data.links);
      });
  }, []);

  return (
    <React.Fragment>
      <div>
        <div className="container">
          <div>
            <b>
              <div className="display-6 colorCodeNortheastern">EXPLORE</div>
              <blockquote className="blockquote">by Category</blockquote>
            </b>
          </div>
          <div className="row">
            {eventCategories.map((item, index) => (
              <div
                className="col-xs-12 col-sm-12 col-md-4 col-lg-3 col-xl-3"
                key={index}>
                <Link to={eventLinks[index]}>
                  <div className="card mx-2 my-2 card-specs rounded d-flex align-items-center">
                    <div className="card-body d-flex align-items-center">
                      <FontAwesomeIcon
                        icon={faCoffee}
                        size="2x"
                        className="mr-3"
                        style={{color: '#B9B9B9'}}
                      />
                      <div
                        className={`text-item text-dark ${
                          item.length > 40 ? "smaller-text" : ""
                        }`}
                      >
                        {item}
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default CategoryView;
