import axios from "axios";
import React, { useEffect, useState } from "react";
import "./styles/Category.css";
import { useParams } from "react-router-dom";
import studentOrganized from "../../assets/studentOrganized.jpeg";

const Category = () => {
  let { categoryName } = useParams();
  let [category, setCategory] = useState({});
  let getCategoryURL =
    "http://localhost:4565/category/getCategories/" + categoryName;
  useEffect(() => {
    console.log(getCategoryURL);
    axios
      .get(getCategoryURL)
      .then((response) => response.data)
      .then((data) => {
        setCategory(data);
      });
  }, []);
  return (
    <React.Fragment>
      <div className="container">
        <div className="row">
            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-8 col-xl-8">
                <div className="rounded setJumbotronHeight text-center p-5 my-5">
                    <div className="display-6">{category.name}</div>
                </div>
            </div>
            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-4 col-xl-4">
                <div className="rounded my-5">
                    <img src={studentOrganized} alt="Students Organized Image" className="img-thumbnail" />
                </div>
            </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Category;
