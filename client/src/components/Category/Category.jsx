import axios from "axios";
import React, { useEffect, useState } from "react";
import "./styles/Category.css";
import { useParams } from "react-router-dom";

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
        <div className="rounded setJumbotronHeight text-center p-5 my-5">
          <div className="display-5">{category.name}</div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Category;
