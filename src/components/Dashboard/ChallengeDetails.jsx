import React, { useEffect, useState } from "react";
import styles from "./ChallengeDetails.module.css"; // Import the CSS module
import { useNavigate } from "react-router-dom";

//TODO : make this dynamic
const CHALLENGE_ID = '13'
const BASE_URL = process.env.REACT_APP_API_URL;

const ChallengeDetails = () => {
  const [challengeDetails,setChallengesDetails] = useState([])
  // Mock data for the challenge details
  // const challengeDetails = {
  //   Name: "Sample Challenge",
  //   Description: "This is a sample description of the challenge.",
  //   ProblemStatement: "Here is the problem statement for the challenge.",
  //   InputFormat: "Expected input format details.",
  //   Constraints: "List of constraints for the challenge.",
  //   OutputFormat: "Expected output format details.",
  // };

  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${BASE_URL}questions/${CHALLENGE_ID}`, {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${localStorage.getItem("accessToken")}`,
          },
        });


      const data = await response.json();
        if (!response.ok) {
          console.log(response.status)
          // 401 means unauthorized , 403 means unauthorized, so the user is either using an old token or is 
          // either bypassing 
          if (response.status === 401 || response.status === 403){
            localStorage.removeItem("accessToken")
            navigate("/")
          }
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        setChallengesDetails(data)
        // Process the data
      } catch (error) {
        // Handle errors
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className={styles.challengeDetailsContainer}>
      <h1 className={styles.title}>
        This is the basic information that describes your challenge.
      </h1>
      <form className={styles.form}>
        {Object.entries(challengeDetails).map(([key, value]) => (
          <div key={key} className={styles.formGroup}>
            <label className={styles.label}>
              {key.replace(/([A-Z])/g, " $1")}
            </label>
            <div
              className={styles.value}
              style={{ "--content-width": `${value.length + 18}px` }}
            >
              {value}
            </div>
          </div>
        ))}
      </form>
      <button type="submit" className={styles.submitButton}>
        Save Changes
      </button>
    </div>
  );
};

export default ChallengeDetails;
