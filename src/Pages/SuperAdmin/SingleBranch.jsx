import { useEffect, useState } from "react";
import Navigation from "../../Components/admin/Navigation";
import { useParams } from "react-router-dom";
import BASE_URL from "../../../apiConfig";

// eslint-disable-next-line react/prop-types
const SingleBranch = ({ Toggle }) => {
  const [userObj1, setUserObj1] = useState([]);
  const [userObj2, setUserObj2] = useState([]);
  const [userObj3, setUserObj3] = useState([]);
  const [userObj4, setUserObj4] = useState([]);
  const [userObj5, setUserObj5] = useState([]);
  const [userObj6, setUserObj6] = useState([]);
  const [userObj7, setUserObj7] = useState([]);
  const [userObj8, setUserObj8] = useState([]);
  const [userObj9, setUserObj9] = useState([]);
  const [userObj10, setUserObj10] = useState([]);
  const [userObj11, setUserObj11] = useState([]);
  const [userObj12, setUserObj12] = useState([]);
  const [userObj13, setUserObj13] = useState([]);
  const [userObj14, setUserObj14] = useState([]);
  const [userObj15, setUserObj15] = useState([]);
  const [userObj16, setUserObj16] = useState([]);
  const [userObj17, setUserObj17] = useState([]);

  const { userId } = useParams();
  useEffect(() => {
    fetchData1(userId);
    fetchData2(userId);
    fetchData3(userId);
    fetchData4(userId);
    fetchData5(userId);
    fetchData6(userId);
    fetchData7(userId);
    fetchData8(userId);
    fetchData9(userId);
    fetchData10(userId);
    fetchData11(userId);
    fetchData12(userId);
    fetchData13(userId);
    fetchData14(userId);
    fetchData15(userId);
    fetchData16(userId);
    fetchData17(userId);
  }, []);
  const fetchData1 = async (id) => {
    try {
      const response = await fetch(`${BASE_URL}makatib/makatibByUserID/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await response.json();
      // console.log(data.data);
      if (data.data) {
        setUserObj1(data.data);
      } else {
        console.error("Error fetching data:", response.status);
      }
    } catch (error) {
      console.error("Network error:", error);
    }
  };
  const fetchData2 = async (id) => {
    try {
      const response = await fetch(`${BASE_URL}masajid/masjidsByUserID/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await response.json();
      // console.log(data.data);
      if (data.data) {
        setUserObj2(data.data);
      } else {
        console.error("Error fetching data:", response.status);
      }
    } catch (error) {
      console.error("Network error:", error);
    }
  };
  const fetchData3 = async (id) => {
    try {
      const response = await fetch(`${BASE_URL}jalsa/julusByUserID/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await response.json();
      // console.log(data.data);
      if (data.data) {
        setUserObj3(data.data);
      } else {
        console.error("Error fetching data:", response.status);
      }
    } catch (error) {
      console.error("Network error:", error);
    }
  };
  const fetchData4 = async (id) => {
    try {
      const response = await fetch(
        `${BASE_URL}darul/darululoomByUserID/${id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const data = await response.json();
      // console.log(data.data);
      if (data.data) {
        setUserObj4(data.data);
      } else {
        console.error("Error fetching data:", response.status);
      }
    } catch (error) {
      console.error("Network error:", error);
    }
  };
  const fetchData5 = async (id) => {
    try {
      const response = await fetch(`${BASE_URL}lib/libraryByUserID/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await response.json();
      if (data.data) {
        setUserObj5(data.data);
      } else {
        console.error("Error fetching data:", response.status);
      }
    } catch (error) {
      console.error("Network error:", error);
    }
  };
  const fetchData6 = async (id) => {
    try {
      const response = await fetch(`${BASE_URL}ulama/ulamaByUserID/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await response.json();
      console.log(data.data);
      if (data.data) {
        setUserObj6(data.data);
      } else {
        console.error("Error fetching data:", response.status);
      }
    } catch (error) {
      console.error("Network error:", error);
    }
  };
  const fetchData7 = async (id) => {
    try {
      const response = await fetch(`${BASE_URL}meeting/meetingByUserID/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await response.json();
      // console.log(data.data);
      if (data.data) {
        setUserObj7(data.data);
      } else {
        console.error("Error fetching data:", response.status);
      }
    } catch (error) {
      console.error("Network error:", error);
    }
  };
  const fetchData8 = async (id) => {
    try {
      const response = await fetch(`${BASE_URL}women/childrenByUserID/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await response.json();
      console.log(data.data);
      if (data.data) {
        setUserObj8(data.data);
      } else {
        console.error("Error fetching data:", response.status);
      }
    } catch (error) {
      console.error("Network error:", error);
    }
  };
  const fetchData9 = async (id) => {
    try {
      const response = await fetch(
        `${BASE_URL}masjidcons/masjidconsByUserID/${id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const data = await response.json();
      console.log(data.data);
      if (data.data) {
        setUserObj9(data.data);
      } else {
        console.error("Error fetching data:", response.status);
      }
    } catch (error) {
      console.error("Network error:", error);
    }
  };
  const fetchData10 = async (id) => {
    try {
      const response = await fetch(
        `${BASE_URL}competions/competionsByUserID/${id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const data = await response.json();
      // console.log(data.data);
      if (data.data) {
        setUserObj10(data.data);
      } else {
        console.error("Error fetching data:", response.status);
      }
    } catch (error) {
      console.error("Network error:", error);
    }
  };
  const fetchData11 = async (id) => {
    try {
      const response = await fetch(`${BASE_URL}trips/tripsByUserID/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await response.json();
      // console.log(data.data);
      if (data.data) {
        setUserObj11(data.data);
      } else {
        console.error("Error fetching data:", response.status);
      }
    } catch (error) {
      console.error("Network error:", error);
    }
  };
  const fetchData12 = async (id) => {
    try {
      const response = await fetch(`${BASE_URL}social/socialByUserID/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await response.json();
      // console.log(data.data);
      if (data.data) {
        setUserObj12(data.data);
      } else {
        console.error("Error fetching data:", response.status);
      }
    } catch (error) {
      console.error("Network error:", error);
    }
  };
  const fetchData13 = async (id) => {
    try {
      const response = await fetch(`${BASE_URL}online/onlineByUserID/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await response.json();
      // console.log(data.data);
      if (data.data) {
        setUserObj13(data.data);
      } else {
        console.error("Error fetching data:", response.status);
      }
    } catch (error) {
      console.error("Network error:", error);
    }
  };
  const fetchData14 = async (id) => {
    try {
      const response = await fetch(`${BASE_URL}school/schoolByUserID/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await response.json();
      // console.log(data.data);
      if (data.data) {
        setUserObj14(data.data);
      } else {
        console.error("Error fetching data:", response.status);
      }
    } catch (error) {
      console.error("Network error:", error);
    }
  };
  const fetchData15 = async (id) => {
    try {
      const response = await fetch(`${BASE_URL}other/otherByUserID/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await response.json();
      // console.log(data.data);
      if (data.data) {
        setUserObj15(data.data);
      } else {
        console.error("Error fetching data:", response.status);
      }
    } catch (error) {
      console.error("Network error:", error);
    }
  };
  const fetchData16 = async (id) => {
    try {
      const response = await fetch(`${BASE_URL}future/futureByUserID/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await response.json();
      // console.log(data.data);
      if (data.data) {
        setUserObj16(data.data);
      } else {
        console.error("Error fetching data:", response.status);
      }
    } catch (error) {
      console.error("Network error:", error);
    }
  };
  const fetchData17 = async (id) => {
    try {
      const response = await fetch(
        `${BASE_URL}markazcon/markazconByUserID/${id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const data = await response.json();
      // console.log(data.data);
      if (data.data) {
        setUserObj17(data.data);
      } else {
        console.error("Error fetching data:", response.status);
      }
    } catch (error) {
      console.error("Network error:", error);
    }
  };
  return (
    <div className="px-3">
      <Navigation Toggle={Toggle} />
      <div className="container-fluid">
        <div className="row bg-white g-3 my-2 pt-1 pb-2 mt-4 fw-bolder fs-2 rounded-3 shadow-sm">
          <h3 className="text-center text-dark">Single Branch</h3>
        </div>
        <div className="row g-3 my-2">
          <div className="row bg-white g-3 my-2 pt-1 pb-2 mt-4 fw-bolder fs-2 rounded-3 shadow-sm">
            <h3 className="text-center text-dark">Makatib</h3>
          </div>
          <table className="table table-hover">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Number of Makatib</th>
                <th scope="col">Makatib Name</th>
                <th scope="col">Students per Makatib</th>
                <th scope="col">Mudarris Details</th>
                <th scope="col">Salary</th>
                <th scope="col">Books Distributed</th>
                <th scope="col">Expenses Details</th>
              </tr>
            </thead>
            <tbody>
              {userObj1.map((item, index) => (
                <tr key={index}>
                  <th scope="row"></th>
                  <td>{item.nofmakatib}</td>
                  <td>{item.makatibname}</td>
                  <td>{item.stupmakatib}</td>
                  <td>{item.mudarrisdetails}</td>
                  <td>{item.salary}</td>
                  <td>{item.booksdist}</td>
                  <td>{item.expensesdet}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="row bg-white g-3 my-2 pt-1 pb-2 mt-4 fw-bolder fs-2 rounded-3 shadow-sm">
            <h3 className="text-center text-dark">Masajid</h3>
          </div>
          <table className="table table-hover">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Places</th>
                <th scope="col">Work progress</th>
                <th scope="col">Activities</th>
                <th scope="col">Funds raised</th>
                <th scope="col">Masajid managed</th>
              </tr>
            </thead>
            <tbody>
              {userObj2.map((item, index) => (
                <tr key={index}>
                  <th scope="row"></th>
                  <td>{item.name}</td>
                  <td>{item.places}</td>
                  <td>{item.workpro}</td>
                  <td>{item.activities}</td>
                  <td>{item.fundsraised}</td>
                  <td>{item.masajidman}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="row bg-white g-3 my-2 pt-1 pb-2 mt-4 fw-bolder fs-2 rounded-3 shadow-sm">
            <h3 className="text-center text-dark">Jalsa Julus</h3>
          </div>
          <div className="table-responsive">
            <table className="table table-hover w-100 overflow-x-auto">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">meeladfund</th>
                  <th scope="col">meeladactivities</th>
                  <th scope="col">meeladexpenses</th>
                  <th scope="col">gyarahweenfund</th>
                  <th scope="col">gyarahweenactivities</th>
                  <th scope="col">gyarahweenexpenses</th>
                  <th scope="col">chattifund</th>
                  <th scope="col">chattiactivities</th>
                  <th scope="col">chattiexpenses</th>
                  <th scope="col">ursetajushariyafund</th>
                  <th scope="col">ursetajushariyaactivities</th>
                  <th scope="col">ursetajushariyaexpenses</th>
                  <th scope="col">urserazviyafund</th>
                  <th scope="col">urserazviyaactivities</th>
                  <th scope="col">urserazviyaexpenses</th>
                  <th scope="col">ursemuftieazamyafund</th>
                  <th scope="col">ursemuftieazamactivities</th>
                  <th scope="col">ursemuftieazamexpenses</th>
                </tr>
              </thead>
              <tbody>
                {userObj3.map((item, index) => (
                  <tr key={index}>
                    <th scope="row"></th>
                    <td>{item.meeladfund}</td>
                    <td>{item.meeladactivities}</td>
                    <td>{item.meeladexpenses}</td>
                    <td>{item.gyarahweenfund}</td>
                    <td>{item.gyarahweenactivities}</td>
                    <td>{item.gyarahweenexpenses}</td>
                    <td>{item.chattifund}</td>
                    <td>{item.chattiactivities}</td>
                    <td>{item.chattiexpenses}</td>
                    <td>{item.ursetajushariyafund}</td>
                    <td>{item.ursetajushariyaactivities}</td>
                    <td>{item.ursetajushariyaexpenses}</td>
                    <td>{item.urserazviyafund}</td>
                    <td>{item.urserazviyaactivities}</td>
                    <td>{item.urserazviyaexpenses}</td>
                    <td>{item.ursemuftieazamyafund}</td>
                    <td>{item.ursemuftieazamactivities}</td>
                    <td>{item.ursemuftieazamexpenses}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="row bg-white g-3 my-2 pt-1 pb-2 mt-4 fw-bolder fs-2 rounded-3 shadow-sm">
            <h3 className="text-center text-dark">Darul-Ulooms</h3>
          </div>
          <table className="table table-hover">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Places</th>
                <th scope="col">Number of Students</th>
                <th scope="col">Facility Provided</th>
                <th scope="col">Mudarris Details</th>
                <th scope="col">Courses Available</th>
                <th scope="col">Dastarbandi Details</th>
                <th scope="col">Number of Talaba Farigh</th>
              </tr>
            </thead>
            <tbody>
              {userObj4.map((item, index) => (
                <tr key={index}>
                  <th scope="row"></th>
                  <td>{item.names}</td>
                  <td>{item.places}</td>
                  <td>{item.nofstudents}</td>
                  <td>{item.facilityprovided}</td>
                  <td>{item.mudarrisdetails}</td>
                  <td>{item.coursesavailable}</td>
                  <td>{item.dastabandidetails}</td>
                  <td>{item.noftalabafarig}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="row bg-white g-3 my-2 pt-1 pb-2 mt-4 fw-bolder fs-2 rounded-3 shadow-sm">
            <h3 className="text-center text-dark">Library</h3>
          </div>
          <table className="table table-hover">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Number Of Books</th>
                <th scope="col">Name of Books</th>
                <th scope="col">Avilability</th>
                <th scope="col">Facility</th>
              </tr>
            </thead>
            <tbody>
              {userObj5.map((item, index) => (
                <tr key={index}>
                  <th scope="row"></th>
                  <td>{item.numberofbooks}</td>
                  <td>{item.nameofbooks}</td>
                  <td>{item.avilability}</td>
                  <td>{item.facility}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="row bg-white g-3 my-2 pt-1 pb-2 mt-4 fw-bolder fs-2 rounded-3 shadow-sm">
            <h3 className="text-center text-dark">Ulama and Huffaz Details</h3>
          </div>
          <table className="table table-hover">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Ulama Name</th>
                <th scope="col">Ulama Position</th>
                <th scope="col">Ulama Contact</th>
              </tr>
            </thead>
            <tbody>
              {userObj6.map((item, index) => (
                <tr key={index}>
                  <th scope="row"></th>
                  <td>{item.ulamaname}</td>
                  <td>{item.ulamaposition}</td>
                  <td>{item.ulamacontact}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="row bg-white g-3 my-2 pt-1 pb-2 mt-4 fw-bolder fs-2 rounded-3 shadow-sm">
            <h3 className="text-center text-dark">Meetings</h3>
          </div>
          <table className="table table-hover">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Subject</th>
                <th scope="col">Discussion</th>
                <th scope="col">Minutes of Meeting</th>
                <th scope="col">Advices</th>
                <th scope="col">Outcomes</th>
                <th scope="col">Date of meeting</th>
              </tr>
            </thead>
            <tbody>
              {userObj7.map((item, index) => (
                <tr key={index}>
                  <th scope="row"></th>
                  <td>{item.subject}</td>
                  <td>{item.discussion}</td>
                  <td>{item.mimeeting}</td>
                  <td>{item.advices}</td>
                  <td>{item.outcomes}</td>
                  <td>{item.dateofmeeting}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="row bg-white g-3 my-2 pt-1 pb-2 mt-4 fw-bolder fs-2 rounded-3 shadow-sm">
            <h3 className="text-center text-dark">
              Women & Children Department
            </h3>
          </div>
          <table className="table table-hover">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Programs Conducted</th>
                <th scope="col">Number of Women Children Associated</th>
                <th scope="col">Outcomes</th>
              </tr>
            </thead>
            <tbody>
              {userObj8.map((item, index) => (
                <tr key={index}>
                  <th scope="row"></th>
                  <td>{item.programsconducted}</td>
                  <td>{item.nofwomchilassosi}</td>
                  <td>{item.outcomes}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="row bg-white g-3 my-2 pt-1 pb-2 mt-4 fw-bolder fs-2 rounded-3 shadow-sm">
            <h3 className="text-center text-dark">Masjid Construction</h3>
          </div>
          <table className="table table-hover">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Plan</th>
                <th scope="col">Budget</th>
                <th scope="col">Status</th>
                <th scope="col">Estimated Time of Completion</th>
                <th scope="col">Facilities</th>
              </tr>
            </thead>
            <tbody>
              {userObj9.map((item, index) => (
                <tr key={index}>
                  <th scope="row"></th>
                  <td>{item.plan}</td>
                  <td>{item.budget}</td>
                  <td>{item.status}</td>
                  <td>{item.etocompletion}</td>
                  <td>{item.facilities}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="row bg-white g-3 my-2 pt-1 pb-2 mt-4 fw-bolder fs-2 rounded-3 shadow-sm">
            <h3 className="text-center text-dark">Competions Organized</h3>
          </div>
          <table className="table table-hover">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Type of competition</th>
                <th scope="col">Date Organized</th>
                <th scope="col">Number of Participants</th>
                <th scope="col">Winners</th>
                <th scope="col">Prizes</th>
                <th scope="col">Expenses</th>
              </tr>
            </thead>
            <tbody>
              {userObj10.map((item, index) => (
                <tr key={index}>
                  <th scope="row"></th>
                  <td>{item.tyocompetion}</td>
                  <td>{item.dateorganized}</td>
                  <td>{item.nospasticipated}</td>
                  <td>{item.winners}</td>
                  <td>{item.prizes}</td>
                  <td>{item.expenses}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="row bg-white g-3 my-2 pt-1 pb-2 mt-4 fw-bolder fs-2 rounded-3 shadow-sm">
            <h3 className="text-center text-dark">Trips & Tours Planned</h3>
          </div>
          <table className="table table-hover">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Places Visited</th>
                <th scope="col">Date</th>
                <th scope="col">Number of Participants</th>
                <th scope="col">Outcomes</th>
                <th scope="col">Expenses</th>
              </tr>
            </thead>
            <tbody>
              {userObj11.map((item, index) => (
                <tr key={index}>
                  <th scope="row"></th>
                  <td>{item.places}</td>
                  <td>{item.date}</td>
                  <td>{item.nospasticipated}</td>
                  <td>{item.outcomes}</td>
                  <td>{item.expenses}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="row bg-white g-3 my-2 pt-1 pb-2 mt-4 fw-bolder fs-2 rounded-3 shadow-sm">
            <h3 className="text-center text-dark">
              Social Media & IT Activities
            </h3>
          </div>
          <table className="table table-hover">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Platform Uploaded</th>
                <th scope="col">Date</th>
                <th scope="col">Type of upload</th>
                <th scope="col">Reaches</th>
                <th scope="col">Likes</th>
              </tr>
            </thead>
            <tbody>
              {userObj12.map((item, index) => (
                <tr key={index}>
                  <th scope="row"></th>
                  <td>{item.platform}</td>
                  <td>{item.date}</td>
                  <td>{item.typeofupload}</td>
                  <td>{item.reach}</td>
                  <td>{item.likes}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="row bg-white g-3 my-2 pt-1 pb-2 mt-4 fw-bolder fs-2 rounded-3 shadow-sm">
            <h3 className="text-center text-dark">Online Programs</h3>
          </div>
          <table className="table table-hover">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Program Conducted For</th>
                <th scope="col">Date</th>
                <th scope="col">Topic</th>
                <th scope="col">No of hours</th>
                <th scope="col">Outcome</th>
                <th scope="col">Number of Participants</th>
              </tr>
            </thead>
            <tbody>
              {userObj13.map((item, index) => (
                <tr key={index}>
                  <th scope="row"></th>
                  <td>{item.progfor}</td>
                  <td>{item.date}</td>
                  <td>{item.topic}</td>
                  <td>{item.nohours}</td>
                  <td>{item.outcome}</td>
                  <td>{item.noparti}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="row bg-white g-3 my-2 pt-1 pb-2 mt-4 fw-bolder fs-2 rounded-3 shadow-sm">
            <h3 className="text-center text-dark">Schools/Colleges</h3>
          </div>
          <table className="table table-hover">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">School/College Name</th>
                <th scope="col">Number of teachers</th>
                <th scope="col">Number of students</th>
                <th scope="col">Class details</th>
                <th scope="col">Facilities</th>
                <th scope="col">Fee Structure</th>
                <th scope="col">Activities</th>
                <th scope="col">Outcome</th>
                <th scope="col">Expenses</th>
              </tr>
            </thead>
            <tbody>
              {userObj14.map((item, index) => (
                <tr key={index}>
                  <th scope="row"></th>
                  <td>{item.name}</td>
                  <td>{item.noteachers}</td>
                  <td>{item.nostudents}</td>
                  <td>{item.classesdet}</td>
                  <td>{item.facility}</td>
                  <td>{item.feestruct}</td>
                  <td>{item.activities}</td>
                  <td>{item.outcome}</td>
                  <td>{item.expenses}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="row bg-white g-3 my-2 pt-1 pb-2 mt-4 fw-bolder fs-2 rounded-3 shadow-sm">
            <h3 className="text-center text-dark">Other Iniatiatives</h3>
          </div>
          <table className="table table-hover">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col"> Name</th>
                <th scope="col">Purpose</th>
                <th scope="col">Duration</th>
                <th scope="col">Outcome</th>
                <th scope="col">Budget</th>
                <th scope="col">Date of completion</th>
              </tr>
            </thead>
            <tbody>
              {userObj15.map((item, index) => (
                <tr key={index}>
                  <th scope="row"></th>
                  <td>{item.name}</td>
                  <td>{item.purpose}</td>
                  <td>{item.duration}</td>
                  <td>{item.outcome}</td>
                  <td>{item.budget}</td>
                  <td>{item.docomple}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="row bg-white g-3 my-2 pt-1 pb-2 mt-4 fw-bolder fs-2 rounded-3 shadow-sm">
            <h3 className="text-center text-dark">Future Projects</h3>
          </div>
          <table className="table table-hover">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col"> Name</th>
                <th scope="col">Purpose</th>
                <th scope="col">Duration</th>
                <th scope="col">Outcome</th>
                <th scope="col">Budget</th>
                <th scope="col">Date of completion</th>
              </tr>
            </thead>
            <tbody>
              {userObj16.map((item, index) => (
                <tr key={index}>
                  <th scope="row"></th>
                  <td>{item.name}</td>
                  <td>{item.purpose}</td>
                  <td>{item.duration}</td>
                  <td>{item.outcome}</td>
                  <td>{item.budget}</td>
                  <td>{item.docomple}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="row bg-white g-3 my-2 pt-1 pb-2 mt-4 fw-bolder fs-2 rounded-3 shadow-sm">
            <h3 className="text-center text-dark">Contributions to Markaz</h3>
          </div>
          <table className="table table-hover">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Fund collection method</th>
                <th scope="col">Date</th>
                <th scope="col">Transfered to masjid / markaz</th>
                <th scope="col">Purpose</th>
              </tr>
            </thead>
            <tbody>
              {userObj17.map((item, index) => (
                <tr key={index}>
                  <th scope="row"></th>
                  <td>{item.fundmeth}</td>
                  <td>{item.date}</td>
                  <td>{item.transferdto}</td>
                  <td>{item.purpose}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SingleBranch;
