import React, { useEffect, useState } from "react";
import "./styles/Category.css";
import axios from "axios";

const CategoryView = () => {

  var [eventCategories, setEventCategories] = useState([]);
  let eventCategoryURL = "http://localhost:4565/category/getCategories";
  
  useEffect(()=>{
    axios.get(eventCategoryURL).then(response=>response.data).then((data)=>{
      setEventCategories(data.categories);
    });
  }, []);

  return (
    <React.Fragment>
    <div>
      <div className="container">
          <div>
            <b>
              <div className="display-6 colorCodeNortheastern">EXPLORE</div>
              <div className="blockquote">by Category</div>
            </b>
          </div>
          <div className="row">
            {
              eventCategories.map((item, index) => (
                <div className="col-xs-12 col-sm-12 col-md-4 col-lg-3 col-xl-3" key={index}>
                  <div className="card mx-2 my-2 card-specs rounded">
                    <div className="card-body text-center">
                      <div className="text-item">{item}</div>
                    </div>
                  </div>
                </div>
              ))
            }
          </div>
        </div>
    </div>
    </React.Fragment>
  );
};

export default CategoryView;
