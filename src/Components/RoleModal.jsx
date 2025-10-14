import React from "react";

const RoleModal = ({ onClose, onSelectRole }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-80 text-center">
        <h2 className="text-xl font-semibold mb-6">Choose Your Role</h2>

        <button
          onClick={() => onSelectRole("student")}
          className="w-full bg-blue-500 text-white py-2 rounded-lg mb-4 hover:bg-blue-600"
        >
          Login as Student
        </button>

        <button
          onClick={() => onSelectRole("provider")}
          className="w-full bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600"
        >
          Login as Room Provider
        </button>

        <button
          onClick={onClose}
          className="w-full text-gray-500 mt-4 hover:text-gray-700"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default RoleModal;
