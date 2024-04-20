import { useEffect, useState } from "react";
import UserNavigation from "../../Components/user/UserNavigation";
import BASE_URL from "../../../apiConfig";

// eslint-disable-next-line react/prop-types
const Annual = ({ Toggle }) => {
  const [userId, setUserId] = useState("");
  const [uniqueYears, setUniqueYears] = useState([]);
  const [selectedYear, setSelectedYear] = useState("");

  useEffect(() => {
    const user = localStorage.getItem("user");
    const parsed = JSON.parse(user);
    setUserId(parsed);
  }, []);

  useEffect(() => {
    const fetchUniqueYears = async () => {
      try {
        const response = await fetch(BASE_URL + "ann/getUniqueYearsAll", {
          method: "GET",
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        if (response.ok) {
          const data = await response.json();
          // Ensure that data.uniqueYears is an array
          if (Array.isArray(data.uniqueYears)) {
            setUniqueYears(data.uniqueYears);
            // Select the first year by default
            if (data.uniqueYears.length > 0) {
              setSelectedYear(data.uniqueYears[0]);
            }
          } else {
            console.log("Data received is not in the expected format");
          }
        } else {
          console.log("Fetch failed:", response.status);
        }
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };

    fetchUniqueYears();
  }, [userId]);

  const handleYearChange = (e) => {
    setSelectedYear(e.target.value);
  };

  const downloadReport = async () => {
    try {
      const response = await fetch(
        `${BASE_URL}annual/getActivitiesReport/${userId.id}?year=${selectedYear}`,
        {
          method: "GET",
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(new Blob([blob]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "activities_report.csv");
        document.body.appendChild(link);
        link.click();
        link.parentNode.removeChild(link);
      } else {
        console.log("Download failed:", response.status);
      }
    } catch (error) {
      console.error("Download error:", error);
    }
  };

  const downloadReportEx = async () => {
    try {
      const response = await fetch(
        `${BASE_URL}annual/getExpensesReport/${userId.id}?year=${selectedYear}`,
        {
          method: "GET",
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(new Blob([blob]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "expenses_report.csv");
        document.body.appendChild(link);
        link.click();
        link.parentNode.removeChild(link);
      } else {
        console.log("Download failed:", response.status);
      }
    } catch (error) {
      console.error("Download error:", error);
    }
  };

  return (
    <div className="px-3">
      <UserNavigation Toggle={Toggle} />
      <div className="container-fluid">
        <div className="row bg-white g-3 my-2 pt-1 pb-2 mt-4 fw-bolder fs-2 rounded-3 shadow-sm">
          <h3 className="text-center text-dark">Annual Report</h3>
        </div>
        <div className="d-flex align-items-center mb-3 mt-3">
          <select
            className="form-control w-25 me-3"
            value={selectedYear}
            onChange={handleYearChange}
          >
            {uniqueYears.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
          <button
            className="btn btn-success w-25 me-3"
            onClick={downloadReport}
          >
            Download Activity Report &nbsp;
            <i className="bi bi-file-earmark-spreadsheet"></i>
          </button>

          <button className="btn btn-warning w-25" onClick={downloadReportEx}>
            Download Expenses Report &nbsp;
            <i className="bi bi-file-earmark-spreadsheet"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Annual;
