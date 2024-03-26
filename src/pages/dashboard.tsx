import React from "react";
import { logoutUser } from "@/utils/authService";

const dashboard = () => {
  return (
    <>
      <div>Welcome to user dashboard</div>
      <button onClick={logoutUser}> Logout </button>
    </>
  );
};

export default dashboard;
