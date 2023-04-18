import axios from "axios";
import React, { useEffect, useState } from "react";
import "./styles/Category.css";
import { useParams } from "react-router-dom";
import studentsOrganized from "../../assets/studentOrganized.jpeg";
import professorsOrganized from "../../assets/professorsOrganized.jpeg";
import speakersOrganized from "../../assets/speakersOrganized.jpeg";
import universityOrganized from "../../assets/universityOrganized.jpeg";
import computerScienceOrganized from "../../assets/computerScience.jpeg";
import engineeringOrganized from "../../assets/engineering.jpeg";
import cpsOrganized from "../../assets/professionalStudies.jpeg";
import scienceOrganized from "../../assets/science.jpeg";
import managementOrganized from "../../assets/management.jpeg";
import otherOrganized from "../../assets/holi.jpeg";
import Footer from "../Layout/Footer";
import { Navbar } from "react-bootstrap";

const Category = ({ handleLogout }) => {
  let { categoryName } = useParams();
  let [category, setCategory] = useState({});
  let getCategoryURL =
    "http://localhost:3000/category/getCategories/" + categoryName;
  useEffect(() => {
    axios
      .get(getCategoryURL)
      .then((response) => response.data)
      .then((data) => {
        setCategory(data);
      });
  }, []);
  return (
    <React.Fragment>
      <div className="pt-3">
        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-8 col-xl-8">
              <div className="rounded setJumbotronHeight text-center p-5 my-5">
                <div className="display-6">{category.name}</div>
              </div>
            </div>
            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-4 col-xl-4">
              <div className="rounded my-5">
                {category.name == "Students Organized Events" ? (
                  <img
                    src={studentsOrganized}
                    alt="Students Organized Image"
                    className="img-thumbnail"
                  />
                ) : category.name == "Professors Organized Events" ? (
                  <img
                    src={professorsOrganized}
                    alt="Professors Organized Image"
                    className="img-thumbnail"
                  />
                ) : category.name == "Speakers Organized Events" ? (
                  <img
                    src={speakersOrganized}
                    alt="Speakers Organized Image"
                    className="img-thumbnail"
                  />
                ) : category.name == "Northeastern's Management Events" ? (
                  <img
                    src={universityOrganized}
                    alt="Northeastern's Management Organized Image"
                    className="img-thumbnail"
                  />
                ) : category.name ==
                  "Khoury College of Computer Science Organized Events" ? (
                  <img
                    src={computerScienceOrganized}
                    alt="Computer Science Organized Image"
                    className="img-thumbnail"
                  />
                ) : category.name == "College of Engineering Organized Events" ? (
                  <img
                    src={engineeringOrganized}
                    alt="Engineering Organized Image"
                    className="img-thumbnail"
                  />
                ) : category.name ==
                  "College of Professional Studies Organized Events" ? (
                  <img
                    src={cpsOrganized}
                    alt="CPS Organized Image"
                    className="img-thumbnail"
                  />
                ) : category.name == "College of Science Organized Events" ? (
                  <img
                    src={scienceOrganized}
                    alt="CPS Organized Image"
                    className="img-thumbnail"
                  />
                ) : category.name == "D'Amore College of Management Events" ? (
                  <img
                    src={managementOrganized}
                    alt="Management Organized Image"
                    className="img-thumbnail"
                  />
                ) : (
                  <img
                    src={otherOrganized}
                    alt="Students Organized Image"
                    className="img-thumbnail"
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Category;
