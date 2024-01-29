import React, { useState,useEffect } from "react";
import styles from "./DescriptionBox.module.css";
import {useNavigate} from 'react-router-dom';
import { faCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const BASE_URL = process.env.REACT_APP_API_URL;

const DescriptionBox = ({ questionId }) => {
  const [tabValue, setTabValue] = useState(0);
  const [challenge, setChallenge] = useState([]);
  const [submissions, setSubmissions] = useState([]);

  const handleShowSubmissions = async () => {
      try {
        const response = await fetch(`${BASE_URL}competition/${questionId}/?submissions=True`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        });

        const data = await response.json();
        if (!response.ok) {
          console.log(response.status);
          // 401 means unauthorized , 403 means unauthorized, so the user is either using an old token or is
          // either bypassing
          if (response.status === 401 || response.status === 403) {
            localStorage.removeItem("accessToken");
            navigate("/");
          }
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        console.log(data);
        setSubmissions(data);
        // Process the data
      } catch (error) {
        // Handle errors
        console.error(error);
      }finally{
      setTabValue(1)    
      }
    
  }

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${BASE_URL}competition/${questionId}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        });

        const data = await response.json();
        if (!response.ok) {
          console.log(response.status);
          // 401 means unauthorized , 403 means unauthorized, so the user is either using an old token or is
          // either bypassing
          if (response.status === 401 || response.status === 403) {
            localStorage.removeItem("accessToken");
            navigate("/");
          }
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        setChallenge(data);
        // Process the data
      } catch (error) {
        // Handle errors
        console.error(error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className={styles.descriptionBox}>
      <div className={styles.tabContainer}>
        <div
          className={`${styles.tab} ${
            tabValue === 0 ? styles.tabSelected : ""
          }`}
          onClick={() => setTabValue(0)}
        >
          Description
        </div>
        <div
          className={`${styles.tab} ${
            tabValue === 1 ? styles.tabSelected : ""
          }`}
          onClick={() => handleShowSubmissions()}
        >
          Submissions
        </div>
      </div>
      {/* i tried other ways but for some reason the useEffect would not load quickly , so i had to do it this way
        see if u can do it better , i am sure there is a better way
      */}
      {tabValue === 0 && challenge.question !== undefined && (
        <div className={styles.contentBox}>
          <h5 className={styles.title}>{challenge.question.title}</h5>
          <div className={styles.difficulty}>
            Difficulty: {challenge.question.lvl}
          </div>
          <p className={styles.description}>{challenge.question.description}</p>
          {challenge.test_cases.map((example) => (
            <div key={example.id} className={styles.exampleBox}>
              <p className={styles.exampleInput}>
                <b>Input:</b> {example.sample}
              </p>
              <p className={styles.exampleOutput}>
                <b>Output:</b> {example.answer}
              </p>
              <p className={styles.exampleExplanation}>
                <b>Explanation:</b> {example.explanation}
              </p>
            </div>
          ))}
        </div>
      )}
      {tabValue === 1 && (
        <div className={styles.submissionsContainer}>
          <table className={styles.submissionsTable}>
            <thead>
              <tr>
                <th>Submission ID</th>
                <th>Language</th>
                <th>Status</th>
                <th>Result</th>
              </tr>
            </thead>
            <tbody>
              {submissions.map((submission, index) => (
                <tr key={index}>
                  <td>{submission.id}</td>
                  <td>{submission.lang}</td>
                  <td>{submission.status}</td>
                  <td>
                    <span className={styles[`status${submission.solved ? "Accepted" : "Rejected"}`]}>
                      <FontAwesomeIcon
                        icon={faCircle}
                        className={styles.circleIcon}
                      />{" "}
                      {submission.solved ? "Accepted" : "Rejected"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default DescriptionBox;
