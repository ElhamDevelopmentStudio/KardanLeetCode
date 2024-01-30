import React from "react";
import "./HomePage.css";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const teamName = localStorage.getItem("username") || "Students";
  const navigate = useNavigate();

  const handleClick = async () => {
    navigate("/contest");
  };

  return (
    <div className="home-page">
      <div className="top-section">
        <div className="logo-container">
          <div className="logo">
            <img src="/logo.png" alt="LOGO" />
          </div>{" "}
        </div>
        <div className="title-container">
          <h1>Kardan Contest</h1>
          <p className="subtitle">
            The best and foremost programming contest in the country.
          </p>
          <p className="welcome-message">
            Welcome to the competition dear, {teamName}
          </p>
          <button
            variant="contained"
            className="get-started-button"
            onClick={handleClick}
          >
            GET STARTED
          </button>
        </div>
      </div>
      <div className="content-section">
        <div className="overview-section">
          <h2 className="section-title">OVERVIEW</h2>
          <p className="section-content">
            Welcome to Kardan Programming Contest, an innovative online platform
            designed for students passionate about programming! Our web
            application provides an engaging environment for participants to
            showcase their coding skills through a series of challenging
            programming questions.
          </p>
        </div>
        <hr className="section-divider" />
        <div className="vision-section">
          <h2 className="section-title">VISION</h2>
          <p className="section-content vision-content">
            At this contest, we envision a world where every student, regardless
            of their background, can access a dynamic and inclusive platform
            that fuels their passion for programming. We strive to be the
            catalyst for a global community of aspiring coders, fostering a
            culture of collaboration, innovation, and continuous learning.
            <br />
            Our vision is to empower students to reach new heights in their
            programming journey by providing a challenging yet supportive
            environment. We see Kardan Programming Contest as not just a
            platform for coding competitions but as a virtual arena where
            creativity meets logic, and where individuals can push the
            boundaries of their coding capabilities.
          </p>
        </div>
        <hr className="section-divider" />
      </div>
    </div>
  );
};

export default HomePage;
