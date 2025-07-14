import React from "react";
import { useParams } from "react-router-dom";

const ItemDetails = () => {
  const { id } = useParams();
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Item Details</h1>
      <div className="text-lg">Item ID: {id}</div>
    </div>
  );
};

export default ItemDetails; 