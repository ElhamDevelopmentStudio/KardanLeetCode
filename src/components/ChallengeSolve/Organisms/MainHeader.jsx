import React, { useState,useEffect } from "react";
import { Box, Button, IconButton } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faUpload,
  faChevronRight,
  faMoon,
  faSun,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import { useSnackbarConfetti } from "../../Helpers/useSnackbarConfetti";
import RunOverlay from "./RunOverlay";

const StyledComponentContainer = styled(Box)(({ theme }) => ({
  border: "1px solid #e0e0e0",
  boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.2)",
  borderRadius: "10px",
  overflow: "hidden",
  background: "linear-gradient(145deg, #e6faff, #bde4ff)",
  padding: "10px 20px",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  transition: "all 0.3s ease-in-out",
  "&:hover": {
    background: "linear-gradient(145deg, #bde4ff, #e6faff)",
    boxShadow: "0px 8px 15px rgba(0, 0, 0, 0.25)",
  },
}));

const StyledButton = styled(Button)(({ theme }) => ({
  color: "#fff", // Color close to black
  textTransform: "none",
  fontWeight: 600,
  margin: "0 10px",
  padding: "8px 16px",
  borderRadius: "20px",
  background: "#0E43AB",
  boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
  transition: "all 0.3s ease-in-out",
  "&:hover": {
    background: theme.palette.primary.main,
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
  },
  "& .MuiButton-startIcon": {
    marginRight: "8px",
  },
}));

const RectangleButton = styled(Button)(({ theme }) => ({
  height: "45px",
  padding: "0 20px",
  borderRadius: "20px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "#0E43AB",
  color: theme.palette.primary.contrastText,
  textTransform: "none",
  fontWeight: 600,
  margin: "0 10px",
  boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
  transition: "all 0.3s ease-in-out",
  "&:hover": {
    backgroundColor: theme.palette.primary.main,
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
  },
}));

const BreathingIconButton = styled(IconButton)(({ theme }) => ({
  width: "50px",
  height: "50px",
  borderRadius: "50%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: theme.palette.mode === "light" ? "#333" : "#f5f5f5",
  color: theme.palette.primary.contrastText,
  animation: "breathing 2s infinite",
  "@keyframes breathing": {
    "0%": { transform: "scale(1)" },
    "50%": { transform: "scale(1.1)" },
    "100%": { transform: "scale(1)" },
  },
  "&:hover": {
    backgroundColor: theme.palette.mode === "light" ? "#555" : "#ddd",
  },
}));

const MainHeader = ({
  runConfetti,
  onToggleDarkMode,
  isDarkMode,
  onSubmit,
}) => {
  const navigate = useNavigate();
  const { trigger, SnackBar, ConfettiEffect } = useSnackbarConfetti();
  const [runLoading, setRunLoading] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);

  const toggleModal = () => {
    setModalOpen(!isModalOpen);
  };
  const mockTestData = {
    tests: [
      { id: 1, name: "Test Case 1", status: "pass" },
      { id: 2, name: "Test Case 2", status: "loading" },
      { id: 3, name: "Test Case 3", status: "fail" },

      { id: 4, name: "Test Case 4", status: "pass" },
      { id: 5, name: "Test Case 5", status: "pass" },
      { id: 6, name: "Test Case 6", status: "loading" },

      { id: 7, name: "Test Case 7", status: "loading" },
      { id: 8, name: "Test Case 8", status: "pass" },
      { id: 9, name: "Test Case 9", status: "loading" },
    ],
    expected: "30\n43\n23\n43",
    actual: "31",
    error: "You did something wrong, boy!",
    errorType: "hasMismatch",

    // ... add more test cases as needed
  };

  console.log(runConfetti);
  useEffect(() => {
    if (runConfetti) {
      trigger();
    }
  }, [runConfetti]);

  const handleProblemList = () => {
    navigate("/contest");
  };

  const handleRun = async (type) => {
    setRunLoading(true);
    setModalOpen(true);
    await onSubmit(type);
    setRunLoading(false);
  };
  return (
    <>
      <StyledComponentContainer>
        <RectangleButton onClick={handleProblemList}>
          Problem List
          <FontAwesomeIcon icon={faChevronRight} />
        </RectangleButton>
        <Box>
          <StyledButton
            onClick={() => handleRun("run")}
            startIcon={<FontAwesomeIcon icon={faPlay} />}
          >
            {runLoading ? "Running ..." : "Run"}
          </StyledButton>
          <StyledButton
            onClick={() => handleRun("submit")}
            startIcon={<FontAwesomeIcon icon={faUpload} />}
          >
            Submit
          </StyledButton>
          <SnackBar />
          <ConfettiEffect />
        </Box>
        <BreathingIconButton onClick={onToggleDarkMode}>
          {isDarkMode ? (
            <FontAwesomeIcon icon={faSun} />
          ) : (
            <FontAwesomeIcon icon={faMoon} />
          )}
        </BreathingIconButton>
      </StyledComponentContainer>
      <RunOverlay
        isOpen={isModalOpen}
        onClose={toggleModal}
        testData={mockTestData} // Pass the mock test results to the overlay
      />
      <SnackBar />
      <ConfettiEffect />
    </>
  );
};

export default MainHeader;
