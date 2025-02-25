import React, { useState,useEffect } from "react";
import {
  Box,
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  Button,
  Typography,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import LeaderboardRowMolecule from "../Molecules/LeaderboardRowMolecule";
import { styled } from "@mui/material/styles";
import "./LeaderboardTableOrganism.scss";
import Pagination from "../../Pagination/Pagination";
import SortableHeader from "../../Dashboard/ManageContests/Sorting/SortableHeader";

const WEBSOCKET_URL = "ws://127.0.0.1:8000/";

const StyledTable = styled(Table)(({ theme }) => ({
  minWidth: 650,
  borderCollapse: "collapse",
  "& thead th": {
    fontWeight: "bold",
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    "&:hover": {
      backgroundColor: theme.palette.primary.dark,
    },
  },
  "& thead th, & tbody td": {
    border: "1px solid #e0e0e0",
  },
}));

const LeaderboardTableOrganism = () => {
  const [filter, setFilter] = useState("");
  const [leaderBoardData, setLeaderboardData] = useState([]);
  const [chatSocket, setChatSocket] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [reportsPerPage, setReportsPerPage] = useState(5);
  const totalPages = Math.ceil(leaderBoardData.length / reportsPerPage);
  const onPageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Calculate the current items to display based on pagination
  const currentData = leaderBoardData.slice(
    (currentPage - 1) * reportsPerPage,
    currentPage * reportsPerPage
  );

  const StyledFormControl = styled(FormControl)({
    minWidth: 120,
    maxWidth: 300,
  });

  const StyledButton = styled(Button)({
    height: "36px",
  });

  const filterOptions = [
    { value: "school", label: "School" },
    { value: "company", label: "Company" },
    { value: "country", label: "Country" },
  ];

  useEffect(() => {
    let accessToken = localStorage.getItem("accessToken");
    let url = `${WEBSOCKET_URL}leaderboard/?token=${accessToken}`;
    const chat = new WebSocket(url);
    setChatSocket(chat);

    chat.onmessage = (e) => {
      const data = JSON.parse(e.data);
      setLeaderboardData(Object.entries(data.message));
    };
  }, []);

  return (
    <>
      <Box className="leaderboard-table-container">
        <Typography variant="h4" className="leaderboard-title">
          Leaderboard
        </Typography>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "20px",
          }}
        >
          <Box sx={{ display: "flex", gap: "10px", marginRight: "-30px" }}>
            <StyledButton
              variant={filter === "all" ? "contained" : "outlined"}
              color="primary"
            >
              All
            </StyledButton>
          </Box>
          <Box sx={{ display: "flex", gap: "20px" }}>
            <StyledFormControl variant="outlined" size="small">
              <InputLabel>Filter by</InputLabel>
              <Select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                label="Filter by"
              >
                {filterOptions.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </StyledFormControl>
          </Box>
        </Box>
        <StyledTable>
          <TableHead sx={{ backgroundColor: "#1565c0" }} className="header">
            <TableRow>
              <TableCell className="table-header-cell">Rank</TableCell>
              <TableCell className="table-header-cell">User</TableCell>
              <TableCell className="table-header-cell">Score</TableCell>
              <TableCell className="table-header-cell">Time</TableCell>
              <TableCell className="table-header-cell">Penalty</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentData.map(([contestantName, contestant], index) => (
              <LeaderboardRowMolecule
                key={contestantName}
                name={contestantName}
                rank={index + 1}
                {...contestant}
              />
            ))}
          </TableBody>
        </StyledTable>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />
      </Box>
    </>
  );
};

export default LeaderboardTableOrganism;