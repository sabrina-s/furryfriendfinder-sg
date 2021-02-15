import React from "react";
import AddDog from "../Dog/AddDog";
import DogTable from "../Dog/DogTable";

const AdminPage = () => {
  return (
    <div className="admin-page">
      <AddDog />
      <DogTable />
    </div>
  );
};

export default AdminPage;
