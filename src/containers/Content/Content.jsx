import React from "react";
import Sidebar from "../Sidebar";
import Punkter from "../../components/Punkter";

const Content = () => {
  return (
    <section className="content">
      <Sidebar />
      <Punkter />
    </section>
  );
};

export default Content;
