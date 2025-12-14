import { TriangleAlert } from "lucide-react";
import React from "react";

function ConfirmPopUp({ open, onYes, onNo }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 backdrop-blur-2xl flex items-start justify-center z-50">
      <div className="bg-white w-[380px] rounded-2xl shadow-lg p-6 m-10 text-center">
        <div
          className="mx-auto w-12 h-12 rounded-full border border-blue-500 
        flex items-center justify-center mb-3"
        >
          <span className="text-blue-600">
            <TriangleAlert />
          </span>
        </div>

        <h2 className="text-xl font-semibold">Confirmation</h2>

        <p className="text-gray-600 mt-2">Do you want to add Item Opening?</p>

        <div className="flex justify-center gap-4 mt-6">
          <button
            onClick={onYes}
            className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700"
          >
            Yes
          </button>

          <button
            onClick={onNo}
            className="border border-blue-500 text-blue-700 px-6 py-2 rounded-full 
            hover:bg-red-100 hover:text-red-600 transition-colors"
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmPopUp;
