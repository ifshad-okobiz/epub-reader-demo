import React from "react";
import { Outlet } from "react-router";

function Home() {
  return (
    <div>
      <Outlet />
    </div>
  );
}

export default Home;
