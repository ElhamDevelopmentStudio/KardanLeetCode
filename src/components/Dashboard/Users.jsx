import React from "react";
import Sidebar from "./Sidebar"; // Assume Sidebar is already implemented
import styles from "./Users.module.css"; // CSS Module for Users
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt, faPlus } from "@fortawesome/free-solid-svg-icons";

const Users = () => {
  // Placeholder data for user list
  const users = [
    { id: 1, name: "Alpha" },
    { id: 2, name: "Beta" },
    { id: 3, name: "Omega" },
    { id: 4, name: "Gamma" },
  ];

  return (
    <div className={styles.container}>
      <Sidebar />
      <div className={styles.usersContainer}>
        <h1 className={styles.title}>Users</h1>
        <button className={styles.addButton}>
          <FontAwesomeIcon icon={faPlus} />
          Add New
        </button>
        <table className={styles.usersTable}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Team Names</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>
                  <FontAwesomeIcon
                    icon={faEdit}
                    className={styles.actionIcon}
                  />
                  <FontAwesomeIcon
                    icon={faTrashAlt}
                    className={styles.actionIcon}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;
