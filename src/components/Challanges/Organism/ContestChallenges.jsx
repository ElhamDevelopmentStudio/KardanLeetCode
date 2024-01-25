import React from "react";
import { useLocation } from 'react-router-dom';
import ChallengeTableOrganism from "./ChallengeTableOrganism";
import "./ContestChallengess.scss";
import Sidebar from "../../Dashboard/Sidebar";
import { useNavigate } from "react-router-dom";

const ContestChallenges = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const name = queryParams.get('name');
  if (name === undefined){
    //TODO:handle when the params is empty here
  }
  const navigate = useNavigate();
  return (
    <div className="page-container">
      <Sidebar />
      <div className="contest-challenges">
        <h2 className="title">Kardan University's Programming Web App</h2>
        <p className="description">
          Add challenges to your contest by selecting challenges from our
          library or create and add your own challenges here. To reorder your
          challenges, simply select the challenge and then drag and drop to the
          desired location.
        </p>
        <div className="challenge-table-container">
          <ChallengeTableOrganism name={name} />
        </div>
        <button onClick={() => navigate("/createchallenge")}>
          Add Challenge
        </button>
      </div>
    </div>
  );
};

export default ContestChallenges;
