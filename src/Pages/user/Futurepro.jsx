import { useEffect, useState, useRef } from "react";
import UserNavigation from "../../Components/user/UserNavigation";
import Swal from "sweetalert2";
import { Navigate } from "react-router-dom";
import BASE_URL from "../../../apiConfig";

// eslint-disable-next-line react/prop-types
const Futurepro = ({ Toggle }) => {
  // eslint-disable-next-line no-unused-vars
  const [isEditMode, setIsEditMode] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const name = useRef();
  const purpose = useRef();
  const duration = useRef();
  const outcome = useRef();
  const budget = useRef();
  const docomple = useRef();
  const mainId = useRef();
  const [userId, setUserId] = useState("");
  const [userObj, setUserObj] = useState([]);
  const [bookObj, setBookObj] = useState({});
  const [bookId, setBookId] = useState("");
  const [suggestion, setSuggestion] = useState({});

  useEffect(() => {
    const user = localStorage.getItem("user");
    const parsed = JSON.parse(user);
    // console.log(parsed);
    setUserId(parsed);
    fetchData(parsed.id);
    fetchSuggestionData(parsed.id);
  }, []);
  //here
  const fetchData = async (id) => {
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
        setUserObj(data.data);
      } else {
        console.error("Error fetching data:", response.status);
      }
    } catch (error) {
      console.error("Network error:", error);
    }
  };
  //here
  const deleteBook = async (id) => {
    const conf = confirm("Are you sure to remove this Future project?");
    if (conf) {
      const response = await fetch(BASE_URL + "future/deletefuture/" + id, {
        method: "delete",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Future project Deleted successfully!",
        });
        window.location.reload();
      }
    }
  };
  // from new
  // const downloadReport = async () => {
  //   // console.log(userObj);
  //   // console.log(userId.id);
  //   const response = await fetch(
  //     BASE_URL "makatib/getReportData/" + userId.id,
  //     {
  //       method: "get",
  //       headers: {
  //         authorization: `Bearer ${localStorage.getItem("token")}`,
  //       },
  //     }
  //   );
  //   if (response.status === 200) {
  //     console.log("success");
  //   } else {
  //     console.log("failure");
  //   }
  // };

  const downloadReport = async () => {
    try {
      const response = await fetch(
        BASE_URL + "future/getReportData/" + userId.id,
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
        link.setAttribute("download", "report.csv");
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

  // eslint-disable-next-line no-unused-vars
  const suggestionDetails = async (item) => {
    // console.log(item);
    const username = JSON.parse(localStorage.getItem("user"));
    const obb = {
      userName: username.name,
      userId: item.userId,
      suggestiondetails: item,
      suggestionActive: true,
    };
    // console.log(obb);
    const response = await fetch(BASE_URL + "ask/addsuggestions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(obb),
    });

    if (response.status === 201) {
      setIsSuccess(true);
      Swal.fire({
        icon: "success",
        title: "New Suggestion Added successfully!",
      });
    }
  };

  const fetchSuggestionData = async (id) => {
    try {
      const response = await fetch(`${BASE_URL}ask/suggestionsByUserID/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await response.json();
      if (data.data) {
        setSuggestion(data.data);
        // console.log("suggestion is here");
        // console.log(data.data); // Use data.data here instead of suggestion
      } else {
        console.error("Error fetching data:", response.status);
      }
    } catch (error) {
      console.error("Network error:", error);
    }
  };

  //to new

  const getBookDataByID = async (id) => {
    // console.log("empty book object -> ", bookObj);
    // console.log(mainId);
    const response = await fetch(BASE_URL + "future/futureByID/" + id, {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    const data = await response.json();
    if (response.status === 200) {
      setBookObj(data.data);
      setIsEditMode(true);
    }
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    setBookId("");
    const obb = {
      name: name.current.value,
      purpose: purpose.current.value,
      duration: duration.current.value,
      outcome: outcome.current.value,
      budget: budget.current.value,
      docomple: docomple.current.value,
      userId: userId.id,
    };

    if (name.current.value === "") {
      Swal.fire({
        icon: "warning",
        title: "Please enter name!",
      });
    } else if (purpose.current.value === "") {
      Swal.fire({
        icon: "warning",
        title: "Please enter purpose",
      });
    } else if (duration.current.value === "") {
      Swal.fire({
        icon: "warning",
        title: "Please enter duration",
      });
    } else if (outcome.current.value === "") {
      Swal.fire({
        icon: "warning",
        title: "Please enter outcome",
      });
    } else if (budget.current.value === "") {
      Swal.fire({
        icon: "warning",
        title: "Please enter budget",
      });
    } else if (docomple.current.value === "") {
      Swal.fire({
        icon: "warning",
        title: "Please enter date of completion",
      });
    } else {
      const response = await fetch(BASE_URL + "future/addfuture", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(obb),
      });

      if (response.status === 201) {
        setIsSuccess(true);
        Swal.fire({
          icon: "success",
          title: "New Future Projects Added successfully!",
        });
      }
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    // console.log("user id is ->  ", userId);
    // console.log("main _id is -> ", bookId);
    const obb = {
      name: name.current.value,
      purpose: purpose.current.value,
      duration: duration.current.value,
      outcome: outcome.current.value,
      budget: budget.current.value,
      docomple: docomple.current.value,
      userId: userId.id,
    };
    if (name.current.value === "") {
      Swal.fire({
        icon: "warning",
        title: "Please enter name!",
      });
    } else if (purpose.current.value === "") {
      Swal.fire({
        icon: "warning",
        title: "Please enter purpose",
      });
    } else if (duration.current.value === "") {
      Swal.fire({
        icon: "warning",
        title: "Please enter duration",
      });
    } else if (outcome.current.value === "") {
      Swal.fire({
        icon: "warning",
        title: "Please enter outcome",
      });
    } else if (budget.current.value === "") {
      Swal.fire({
        icon: "warning",
        title: "Please enter budget",
      });
    } else if (docomple.current.value === "") {
      Swal.fire({
        icon: "warning",
        title: "Please enter date of completion",
      });
    } else {
      const response = await fetch(BASE_URL + "future/updatefuture/" + bookId, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(obb),
      });

      if (response.status === 200) {
        setIsSuccess(true);
        Swal.fire({
          icon: "success",
          title: "Future Projects Updated successfully!",
        });
      }
    }
  };

  if (isSuccess) {
    return <Navigate to="/dashboard" />;
  }
  return (
    <div className="px-3">
      <UserNavigation Toggle={Toggle} />
      {/* Future Projects */}
      <div className="container-fluid">
        <div className="row bg-white g-3 my-2 pt-1 pb-2 mt-4 fw-bolder fs-2 rounded-3 shadow-sm">
          <h3 className="text-center text-dark">Future Projects</h3>
        </div>
        <div className="row g-3 my-2">
          <div className="ms-auto">
            <button
              className="btn btn-primary"
              type="button"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
              onClick={() => {
                setIsEditMode(false);
                name.current.value = "";
                purpose.current.value = "";
                duration.current.value = "";
                outcome.current.value = "";
                budget.current.value = "";
                docomple.current.value = "";
                mainId.current.value = "";
              }}
            >
              Add New <i className="bi bi-plus-square-fill"></i>
            </button>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <button className="btn btn-success" onClick={downloadReport}>
              Download Report &nbsp;
              <i className="bi bi-file-earmark-spreadsheet"></i>
            </button>
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
                <th scope="col">Edit</th>
                <th scope="col">Delete</th>
                <th scope="col">Ask Suggestion</th>
              </tr>
            </thead>
            <tbody>
              {userObj.map((item, index) => (
                <tr key={index}>
                  <th scope="row"></th>
                  <td>{item.name}</td>
                  <td>{item.purpose}</td>
                  <td>{item.duration}</td>
                  <td>{item.outcome}</td>
                  <td>{item.budget}</td>
                  <td>{item.docomple}</td>
                  <td>
                    <button
                      className="btn btn-success"
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModal"
                      onClick={() => {
                        setIsEditMode(true);
                        getBookDataByID(item._id);
                        setBookId(item._id);
                      }}
                      // onChange={() => setBookId(item._id)}
                    >
                      Edit<i className="bi bi-pencil-square"></i>
                    </button>
                  </td>
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={() => deleteBook(item._id)}
                    >
                      Delete<i className="bi bi-trash3-fill"></i>
                    </button>
                  </td>
                  <td>
                    {suggestion &&
                    suggestion.length > 0 &&
                    suggestion.find(
                      (s) =>
                        s.suggestiondetails._id === item._id &&
                        s.suggestionActive === true
                    ) ? (
                      <button
                        className="btn btn-warning"
                        onClick={() => suggestionDetails(item)}
                        disabled
                      >
                        Ask for suggestion
                      </button>
                    ) : (
                      <button
                        className="btn btn-warning"
                        onClick={() => suggestionDetails(item)}
                      >
                        Ask for suggestion
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* <!-- Modal --> */}
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Add New / Update Future Projects
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="row g-3">
                <div className="col-12">
                  <div className="p-3 bg-white shadow-sm d-flex justify-content-around align-items-center rounded">
                    <div className="form-floating w-100">
                      <input
                        type="hidden"
                        name="_id"
                        ref={mainId}
                        defaultValue={bookId}
                      />
                      <input
                        type="text"
                        className="form-control"
                        id="numbook"
                        defaultValue={bookObj.name}
                        placeholder="Name"
                        ref={name}
                        // onChange={(e) => setIsName(e.target.value)}
                      />
                      <label htmlFor="floatingInput">Enter Name</label>
                    </div>
                  </div>
                </div>
                <div className="col-12">
                  <div className="p-3 bg-white shadow-sm d-flex justify-content-around align-items-center rounded">
                    <div className="form-floating w-100">
                      <input
                        type="text"
                        className="form-control"
                        id="bookname"
                        defaultValue={bookObj.purpose || "" || null}
                        placeholder="Book name"
                        ref={purpose}
                        // onChange={(e) => setIsAddress(e.target.value)}
                      />
                      <label htmlFor="floatingInput">Enter purpose</label>
                    </div>
                  </div>
                </div>
                <div className="col-12">
                  <div className="p-3 bg-white shadow-sm d-flex justify-content-around align-items-center rounded">
                    <div className="form-floating w-100">
                      <input
                        type="text"
                        className="form-control"
                        id="avail"
                        defaultValue={bookObj.duration || "" || null}
                        placeholder="avail"
                        ref={duration}
                        // onChange={(e) => setIsMember(e.target.value)}
                      />
                      <label htmlFor="floatingInput">Enter duration</label>
                    </div>
                  </div>
                </div>
                <div className="col-12">
                  <div className="p-3 bg-white shadow-sm d-flex justify-content-around align-items-center rounded">
                    <div className="form-floating w-100">
                      <input
                        type="text"
                        className="form-control"
                        id="avail"
                        defaultValue={bookObj.outcome || "" || null}
                        placeholder="avail"
                        ref={outcome}
                        // onChange={(e) => setIsMember(e.target.value)}
                      />
                      <label htmlFor="floatingInput">Enter outcome</label>
                    </div>
                  </div>
                </div>
                <div className="col-12">
                  <div className="p-3 bg-white shadow-sm d-flex justify-content-around align-items-center rounded">
                    <div className="form-floating w-100">
                      <input
                        type="text"
                        className="form-control"
                        id="avail"
                        defaultValue={bookObj.budget || "" || null}
                        placeholder="avail"
                        ref={budget}
                        // onChange={(e) => setIsMember(e.target.value)}
                      />
                      <label htmlFor="floatingInput">Enter budget</label>
                    </div>
                  </div>
                </div>
                <div className="col-12">
                  <div className="p-3 bg-white shadow-sm d-flex justify-content-around align-items-center rounded">
                    <div className="form-floating w-100">
                      <input
                        type="text"
                        className="form-control"
                        id="avail"
                        defaultValue={bookObj.docomple || "" || null}
                        placeholder="avail"
                        ref={docomple}
                        // onChange={(e) => setIsMember(e.target.value)}
                      />
                      <label htmlFor="floatingInput">
                        Expected date of completion
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              {isEditMode ? (
                <button
                  type="button"
                  className="btn btn-success"
                  onClick={handleUpdate}
                  data-bs-dismiss="modal"
                  id="editBtn"
                >
                  Edit changes
                </button>
              ) : (
                <button
                  type="button"
                  className="btn btn-success"
                  onClick={handleAdd}
                  data-bs-dismiss="modal"
                  id="addBtn"
                >
                  Add New
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Futurepro;
