import React, { useEffect, useState } from "react";
import AttendenceSearchBar from "../../common/SearchBar/AttendenceSearchBar";
import Datatable from "../../common/Datatables/Datatable";
import { getAPI } from "../../utility/api/apiCall";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { Navigate, useNavigate } from "react-router-dom";

const columns = [
  { header: "First Name", accessor: "firstName" },
  { header: "Last Name", accessor: "lastName" },
  {
    header: "Class",
    accessor: "currentClass.name",
    render: (rowData) => {
      return rowData.currentClass && rowData.currentClass.name
        ? rowData.currentClass.name
        : "NA";
    },
  },
  {
    header: "Section",
    accessor: "currentSection.name",
    render: (rowData) => {
      return rowData.currentSection && rowData.currentSection.name
        ? rowData.currentSection.name
        : "NA";
    },
  },
  { header: "Roll Number", accessor: "rollNumber" },
  { header: "Gender", accessor: "gender" },
  { header: "Email", accessor: "email" },
];

const StudentAddFillForm = () => {
  const [studentData, setStudentData] = useState([]);
  const [filteredStudentData, setFilteredStudentData] = useState([]);
  const [classItems, setClassItems] = useState([]);
  const [sectionItems, setSectionItems] = useState([]);
  const [selectedClass, setSelectedClass] = useState(null);
  const [selectedSection, setSelectedSection] = useState(null);
  const [searchText, setSearchText] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const fetchDropdownData = async () => {
    try {
      await getAPI("getAllClasses", {}, setClassItems);
      await getAPI("getAllSections", {}, setSectionItems);
    } catch (error) {
      console.error("Error fetching dropdown data:", error);
    }
  };

  useEffect(() => {
    fetchDropdownData();
  }, []);

  const handleFilter = async ({ type, value }) => {
    if (type === "class" && value) {
      setSelectedClass(value);
      setSelectedSection(null); // Reset section when class changes
      await fetchDataByClass(value._id);
    } else if (type === "section" && value) {
      setSelectedSection(value);
      if (selectedClass) {
        await fetchDataByClassAndSection(selectedClass._id, value._id);
      }
    }
  };

  const handleSearch = (searchText) => {
    setSearchText(searchText);
    if (studentData.length > 0) {
      const filteredData = studentData.filter((student) => {
        const fullName =
          `${student.firstName} ${student.lastName}`.toLowerCase();
        return (
          fullName.includes(searchText.toLowerCase()) ||
          student.rollNumber.toLowerCase().includes(searchText.toLowerCase())
        );
      });
      setFilteredStudentData(filteredData);
    }
  };

  const fetchDataByClass = async (classId) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/getallstudents/${classId}`
      );

      if (response.data && Array.isArray(response.data.data)) {
        setStudentData(response.data.data);
        setFilteredStudentData(response.data.data);
      }
    } catch (error) {
      toast.error("Error fetching student data!");
    } finally {
      setLoading(false);
    }
  };

  const fetchDataByClassAndSection = async (classId, sectionId) => {
    setLoading(true);

    try {
      const response = await axios.post(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/api/get-student-by-classandsection`,
        {
          classId: classId,
          sectionId: sectionId,
        }
      );

      console.log("Response:", response.data.data);
      if (response.data && Array.isArray(response.data.data)) {
        setStudentData(response.data.data);
        setFilteredStudentData(response.data.data);
      }
    } catch (error) {
      console.log("Error fetching student data:", error);
      if (error.response && error.response.status === 404) {
        toast.error("No students found for the selected class and section.");
      } else {
        toast.error(
          "An error occurred while fetching student data. Please try again."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  const handlePrint = async (item) => {
    console.log("Viewing student attendance:", item);
    // navigate(`/school/student-pre-fill-form/${item}`);
    navigate(`/school/student-pre-fill-form/${item}`, {
      state: { studentId: item },
    });
  };

  return (
    <div>
      <AttendenceSearchBar
        classItems={classItems}
        sectionItems={sectionItems}
        onFilter={handleFilter}
        onSearch={handleSearch}
      />
      {loading ? (
        <div className="loader-wrapper">
          <span className="loader"></span>
        </div>
      ) : filteredStudentData.length === 0 ? (
        <div className="no-data-message text-xl flex justify-center text-red-500">
          {selectedClass || selectedSection
            ? "Oops! No Student Records Found."
            : "Please select a class and section to view student data."}
        </div>
      ) : (
        <Datatable
          columns={columns}
          data={filteredStudentData}
          actions={{
            onView: (item) => handlePrint(item),
          }}
        />
      )}
      <ToastContainer />
    </div>
  );
};

export default StudentAddFillForm;
