import React from "react";
import { NavLink } from "react-router-dom";
import logo from "../../assets/images/Logo.jpg";
import classes from "./Navbar.module.css";
function Navbar(props) {
  return (
      <div>
    <div className={classes.header}> <img
              src={logo}
              alt="logo"
              style={{ height: "35px", width: "35px" }}
            ></img></div>
    <div className="ui pointing menu">
   
      <NavLink to="/LetsSurvey" exact className="item">
        Create Survey
      </NavLink>
      <NavLink to="/LetsSurvey/AllSurveys" className="item">
        See all Surveys
      </NavLink>
    </div>
    </div>
  );
}
export default Navbar;
