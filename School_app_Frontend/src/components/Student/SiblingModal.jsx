import axios from "axios";
import React from "react";

const SiblingModal = ({
  isOpen,
  onClose,
  siblings,
  siblingGroupId,
  onSiblingRemoved,
}) => {
  const handleRemoveSibling = async (studentId) => {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/remove-sibling-from-group`,
        {
          siblingGroupId,
          studentId,
        }
      );
      if (response.status === 200) {
        onSiblingRemoved(studentId);
      } else {
        console.error("Failed to remove sibling.");
      }
    } catch (error) {
      console.error("Error removing sibling:", error);
    }
  };

  return (
    <div
      className={`fixed inset-0 bg-gray-900 bg-opacity-90 flex justify-center items-center ${
        isOpen ? "" : "hidden"
      }`}
      style={{ zIndex: 1000 }}
    >
      <div className="bg-gradient-to-br from-[#283046] to-gray-800 p-8 rounded-xl w-3/4 max-h-[85%] overflow-y-auto shadow-2xl transform transition-all duration-500 ease-in-out scale-100 hover:scale-105">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-4xl font-extrabold text-[#65fa9e] tracking-wide">
            Siblings Information
          </h2>
          <button
            onClick={onClose}
            className="text-red-500 text-3xl font-bold focus:outline-none hover:text-red-700 transition duration-300"
          >
            &times;
          </button>
        </div>
        {siblings.length === 0 ? (
          <div className="text-center text-gray-400 text-xl italic">
            No siblings found.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {siblings.map((sibling) => (
              <div
                key={sibling._id}
                className="p-6 bg-gray-800 border border-gray-700 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 transform hover:-translate-y-2 hover:scale-105"
              >
                <img
                  src={sibling.studentPhoto || "default-image-url.jpg"}
                  alt={`${sibling.firstName} ${sibling.lastName}`}
                  className="w-full h-48 object-cover rounded-lg mb-4 shadow-md hover:shadow-xl transition-shadow duration-300"
                />
                <h3 className="text-2xl font-semibold text-[#65fa9e] mb-2 text-center">
                  {`${sibling.firstName} ${sibling.lastName}`}
                </h3>
                <p className="text-gray-300 text-base font-medium text-center">
                  Class: {sibling.currentClass.name}
                </p>
                <button
                  onClick={() => handleRemoveSibling(sibling._id)}
                  className="mt-4 w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition duration-300"
                >
                  Remove Sibling
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
export default SiblingModal;
