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
import Footer from "../Footer/footer";
import Navbar from "../../components/Navbar/Navbar";
import AllEvents from "../../pages/AllEvents/AllEvents";
import { getAllEventsByCategory } from "../../apiClient";
import { useStateWithCallbackLazy } from "use-state-with-callback";

const Category = (props) => {
  let { categoryName } = useParams();
  let [category, setCategory] = useStateWithCallbackLazy({});
  const [eventArray, setEventArray] = useState([]);
  let getCategoryURL =
    "http://localhost:3000/category/getCategories/" + categoryName;

  const fetchCategory = () => {
    axios
      .get(getCategoryURL)
      .then((response) => response.data)
      .then((data) => {
        setCategory(data);
      });
  };
  const fetchEventsByCategory = async () => {
    try {
      const response = await getAllEventsByCategory(category.name);
      if (response.data) {
        setEventArray(response.data.reverse());
      }
    } catch (e) {
      console.error(e);
    }
  };
  useEffect(() => {
    fetchCategory();
    fetchEventsByCategory();
  }, [category, eventArray]);
  return (
    <>
      <Navbar handlelogout={props.handlelogout} />
      <div className="pt-3 getPageSizeForCategory">
        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
              <div className="rounded setJumbotronHeight text-center p-5 mt-3">
                <div className="display-6">{category.name}</div>
              </div>
              <AllEvents eventArray={eventArray} getList={category.name} />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Category;
