import { useEffect, useState, useRef } from "react";
import UserNavigation from "../../Components/user/UserNavigation";
import Swal from "sweetalert2";
import { Navigate } from "react-router-dom";
import BASE_URL from "../../../apiConfig";

// eslint-disable-next-line react/prop-types
const Jalsa = ({ Toggle }) => {
  // eslint-disable-next-line no-unused-vars
  const [isEditMode, setIsEditMode] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const meeladfund = useRef();
  const meeladactivities = useRef();
  const meeladexpenses = useRef();
  const gyarahweenfund = useRef();
  const gyarahweenactivities = useRef();
  const gyarahweenexpenses = useRef();
  const chattifund = useRef();
  const chattiactivities = useRef();
  const chattiexpenses = useRef();
  const ursetajushariyafund = useRef();
  const ursetajushariyaactivities = useRef();
  const ursetajushariyaexpenses = useRef();
  const urserazviyafund = useRef();
  const urserazviyaactivities = useRef();
  const urserazviyaexpenses = useRef();
  const ursemuftieazamyafund = useRef();
  const ursemuftieazamactivities = useRef();
  const ursemuftieazamexpenses = useRef();
  const mainId = useRef();
  const [userId, setUserId] = useState("");
  const [userObj, setUserObj] = useState([]);
  const [bookObj, setBookObj] = useState({});
  const [bookId, setBookId] = useState("");
  const [suggestion, setSuggestion] = useState({});


  useEffect(() => {
    const user = localStorage.getItem("user");
    const parsed = JSON.parse(user);
    setUserId(parsed);
    fetchData(parsed.id);
    fetchSuggestionData(parsed.id);
  }, []);
  //here
  const fetchData = async (id) => {
    try {
      const response = await fetch(
        `${BASE_URL}jalsa/julusByUserID/${id}`,
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
    const conf = confirm("Are you sure to remove this Julus?");
    if (conf) {
      const response = await fetch(
        "http://localhost:8080/api/jalsa/deletejulus/" + id,
        {
          method: "delete",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Julus Deleted successfully!",
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
        BASE_URL + "makatib/getReportData/" + userId.id,
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
    const response = await fetch(
      BASE_URL +"jalsa/julusByID/" + id,
      {
        method: "get",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
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
      meeladfund: meeladfund.current.value,
      meeladactivities: meeladactivities.current.value,
      meeladexpenses: meeladexpenses.current.value,
      gyarahweenfund: gyarahweenfund.current.value,
      gyarahweenactivities: gyarahweenactivities.current.value,
      gyarahweenexpenses: gyarahweenexpenses.current.value,
      chattifund: chattifund.current.value,
      chattiactivities: chattiactivities.current.value,
      chattiexpenses: chattiexpenses.current.value,
      ursetajushariyafund: ursetajushariyafund.current.value,
      ursetajushariyaactivities: ursetajushariyaactivities.current.value,
      ursetajushariyaexpenses: ursetajushariyaexpenses.current.value,
      urserazviyafund: urserazviyafund.current.value,
      urserazviyaactivities: urserazviyaactivities.current.value,
      urserazviyaexpenses: urserazviyaexpenses.current.value,
      ursemuftieazamyafund: ursemuftieazamyafund.current.value,
      ursemuftieazamactivities: ursemuftieazamactivities.current.value,
      ursemuftieazamexpenses: ursemuftieazamexpenses.current.value,
      userId: userId.id,
    };
    if (meeladfund.current.value === "") {
      Swal.fire({
        icon: "warning",
        title: "Please enter Name",
      });
    } else if (meeladactivities.current.value === "") {
      Swal.fire({
        icon: "warning",
        title: "Please enter Place",
      });
    } else if (meeladexpenses.current.value === "") {
      Swal.fire({
        icon: "warning",
        title: "Please enter Work in Progress",
      });
    } else if (gyarahweenfund.current.value === "") {
      Swal.fire({
        icon: "warning",
        title: "Please enter Activities",
      });
    } else if (gyarahweenactivities.current.value === "") {
      Swal.fire({
        icon: "warning",
        title: "Please enter Funds Raised",
      });
    } else if (gyarahweenexpenses.current.value === "") {
      Swal.fire({
        icon: "warning",
        title: "Please enter Masjid Maintainance",
      });
    } else if (chattifund.current.value === "") {
      Swal.fire({
        icon: "warning",
        title: "Please enter Activities",
      });
    } else if (chattiactivities.current.value === "") {
      Swal.fire({
        icon: "warning",
        title: "Please enter Funds Raised",
      });
    } else if (chattiexpenses.current.value === "") {
      Swal.fire({
        icon: "warning",
        title: "Please enter Masjid Maintainance",
      });
    } else if (ursetajushariyafund.current.value === "") {
      Swal.fire({
        icon: "warning",
        title: "Please enter Activities",
      });
    } else if (ursetajushariyaactivities.current.value === "") {
      Swal.fire({
        icon: "warning",
        title: "Please enter Funds Raised",
      });
    } else if (ursetajushariyaexpenses.current.value === "") {
      Swal.fire({
        icon: "warning",
        title: "Please enter Masjid Maintainance",
      });
    } else if (urserazviyafund.current.value === "") {
      Swal.fire({
        icon: "warning",
        title: "Please enter Activities",
      });
    } else if (urserazviyaactivities.current.value === "") {
      Swal.fire({
        icon: "warning",
        title: "Please enter Funds Raised",
      });
    } else if (urserazviyaexpenses.current.value === "") {
      Swal.fire({
        icon: "warning",
        title: "Please enter Masjid Maintainance",
      });
    } else if (ursemuftieazamyafund.current.value === "") {
      Swal.fire({
        icon: "warning",
        title: "Please enter Activities",
      });
    } else if (ursemuftieazamactivities.current.value === "") {
      Swal.fire({
        icon: "warning",
        title: "Please enter Funds Raised",
      });
    } else if (ursemuftieazamexpenses.current.value === "") {
      Swal.fire({
        icon: "warning",
        title: "Please enter Masjid Maintainance",
      });
    } else {
      const response = await fetch( BASE_URL +"jalsa/addjulus", {
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
          title: "New Jalsa Added successfully!",
        });
      }
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    // console.log("user id is ->  ", userId);
    // console.log("main _id is -> ", bookId);
    const obb = {
      meeladfund: meeladfund.current.value,
      meeladactivities: meeladactivities.current.value,
      meeladexpenses: meeladexpenses.current.value,
      gyarahweenfund: gyarahweenfund.current.value,
      gyarahweenactivities: gyarahweenactivities.current.value,
      gyarahweenexpenses: gyarahweenexpenses.current.value,
      chattifund: chattifund.current.value,
      chattiactivities: chattiactivities.current.value,
      chattiexpenses: chattiexpenses.current.value,
      ursetajushariyafund: ursetajushariyafund.current.value,
      ursetajushariyaactivities: ursetajushariyaactivities.current.value,
      ursetajushariyaexpenses: ursetajushariyaexpenses.current.value,
      urserazviyafund: urserazviyafund.current.value,
      urserazviyaactivities: urserazviyaactivities.current.value,
      urserazviyaexpenses: urserazviyaexpenses.current.value,
      ursemuftieazamyafund: ursemuftieazamyafund.current.value,
      ursemuftieazamactivities: ursemuftieazamactivities.current.value,
      ursemuftieazamexpenses: ursemuftieazamexpenses.current.value,
      userId: userId.id,
    };
    if (meeladfund.current.value === "") {
      Swal.fire({
        icon: "warning",
        title: "Please enter Name",
      });
    } else if (meeladactivities.current.value === "") {
      Swal.fire({
        icon: "warning",
        title: "Please enter Place",
      });
    } else if (meeladexpenses.current.value === "") {
      Swal.fire({
        icon: "warning",
        title: "Please enter Work in Progress",
      });
    } else if (gyarahweenfund.current.value === "") {
      Swal.fire({
        icon: "warning",
        title: "Please enter Activities",
      });
    } else if (gyarahweenactivities.current.value === "") {
      Swal.fire({
        icon: "warning",
        title: "Please enter Funds Raised",
      });
    } else if (gyarahweenexpenses.current.value === "") {
      Swal.fire({
        icon: "warning",
        title: "Please enter Masjid Maintainance",
      });
    } else if (chattifund.current.value === "") {
      Swal.fire({
        icon: "warning",
        title: "Please enter Activities",
      });
    } else if (chattiactivities.current.value === "") {
      Swal.fire({
        icon: "warning",
        title: "Please enter Funds Raised",
      });
    } else if (chattiexpenses.current.value === "") {
      Swal.fire({
        icon: "warning",
        title: "Please enter Masjid Maintainance",
      });
    } else if (ursetajushariyafund.current.value === "") {
      Swal.fire({
        icon: "warning",
        title: "Please enter Activities",
      });
    } else if (ursetajushariyaactivities.current.value === "") {
      Swal.fire({
        icon: "warning",
        title: "Please enter Funds Raised",
      });
    } else if (ursetajushariyaexpenses.current.value === "") {
      Swal.fire({
        icon: "warning",
        title: "Please enter Masjid Maintainance",
      });
    } else if (urserazviyafund.current.value === "") {
      Swal.fire({
        icon: "warning",
        title: "Please enter Activities",
      });
    } else if (urserazviyaactivities.current.value === "") {
      Swal.fire({
        icon: "warning",
        title: "Please enter Funds Raised",
      });
    } else if (urserazviyaexpenses.current.value === "") {
      Swal.fire({
        icon: "warning",
        title: "Please enter Masjid Maintainance",
      });
    } else if (ursemuftieazamyafund.current.value === "") {
      Swal.fire({
        icon: "warning",
        title: "Please enter Activities",
      });
    } else if (ursemuftieazamactivities.current.value === "") {
      Swal.fire({
        icon: "warning",
        title: "Please enter Funds Raised",
      });
    } else if (ursemuftieazamexpenses.current.value === "") {
      Swal.fire({
        icon: "warning",
        title: "Please enter Masjid Maintainance",
      });
    } else {
      const response = await fetch(
        BASE_URL +"jalsa/updatejulus/" + bookId,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(obb),
        }
      );

      if (response.status === 200) {
        setIsSuccess(true);
        Swal.fire({
          icon: "success",
          title: "Julus Updated successfully!",
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
      <div className="container-fluid">
        <div className="row bg-white g-3 my-2 pt-1 pb-2 mt-4 fw-bolder fs-2 rounded-3 shadow-sm">
          <h3 className="text-center text-dark">Jalsa & Julus</h3>
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
                meeladfund.current.value = "";
                meeladactivities.current.value = "";
                meeladexpenses.current.value = "";
                gyarahweenfund.current.value = "";
                gyarahweenactivities.current.value = "";
                gyarahweenexpenses.current.value = "";
                chattifund.current.value = "";
                chattiactivities.current.value = "";
                chattiexpenses.current.value = "";
                ursetajushariyafund.current.value = "";
                ursetajushariyaactivities.current.value = "";
                ursetajushariyaexpenses.current.value = "";
                urserazviyafund.current.value = "";
                urserazviyaactivities.current.value = "";
                urserazviyaexpenses.current.value = "";
                ursemuftieazamyafund.current.value = "";
                ursemuftieazamactivities.current.value = "";
                ursemuftieazamexpenses.current.value = "";
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
                  <th scope="col">Edit</th>
                  <th scope="col">Delete</th>
                  <th scope="col">Ask Suggestion</th>
                </tr>
              </thead>
              <tbody>
                {userObj.map((item, index) => (
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
                Add New / Update Masajid Details
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
                <div className="row g-3 my-2">
                  <div className="col-12">
                    <div className="p-3 bg-white shadow-sm d-flex justify-content-around align-items-center rounded">
                      <div className="form-floating w-100">
                        <input
                          type="text"
                          className="form-control"
                          id="name"
                          defaultValue={bookObj.meeladfund || "" || null}
                          placeholder="Name"
                          ref={meeladfund}
                          // onChange={(e) => setIsName(e.target.value)}
                        />
                        <label htmlFor="floatingInput">
                          Meelad Funds Raised
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="p-3 bg-white shadow-sm d-flex justify-content-around align-items-center rounded">
                      <div className="form-floating w-100">
                        <input
                          type="text"
                          className="form-control"
                          id="place"
                          defaultValue={bookObj.meeladactivities || "" || null}
                          placeholder="Place"
                          ref={meeladactivities}
                          // onChange={(e) => setIsAddress(e.target.value)}
                        />
                        <label htmlFor="floatingInput">Meelad Activities</label>
                      </div>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="p-3 bg-white shadow-sm d-flex justify-content-around align-items-center rounded">
                      <div className="form-floating w-100">
                        <input
                          type="text"
                          className="form-control"
                          id="number"
                          defaultValue={bookObj.meeladexpenses || "" || null}
                          placeholder="Number"
                          ref={meeladexpenses}
                          // onChange={(e) => setIsMember(e.target.value)}
                        />
                        <label htmlFor="floatingInput">Meelad Expenses</label>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row g-3 my-2">
                  <div className="col-12">
                    <div className="p-3 bg-white shadow-sm d-flex justify-content-around align-items-center rounded">
                      <div className="form-floating w-100">
                        <input
                          type="text"
                          className="form-control"
                          id="designation"
                          defaultValue={bookObj.gyarahweenfund || "" || null}
                          placeholder="Designation"
                          ref={gyarahweenfund}
                          // onChange={(e) => setIsDesign(e.target.value)}
                        />
                        <label htmlFor="floatingInput">
                          Gayarh-ween Funds Raised
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="p-3 bg-white shadow-sm d-flex justify-content-around align-items-center rounded">
                      <div className="form-floating w-100">
                        <input
                          type="text"
                          className="form-control"
                          id="phone"
                          defaultValue={
                            bookObj.gyarahweenactivities || "" || null
                          }
                          placeholder="Phone"
                          ref={gyarahweenactivities}
                          // onChange={(e) => setIsPhone(e.target.value)}
                        />
                        <label htmlFor="floatingInput">
                          Gayarh-ween Activities
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="p-3 bg-white shadow-sm d-flex justify-content-around align-items-center rounded">
                      <div className="form-floating w-100">
                        <input
                          type="text"
                          className="form-control"
                          id="account"
                          defaultValue={
                            bookObj.gyarahweenexpenses || "" || null
                          }
                          placeholder="Account"
                          ref={gyarahweenexpenses}
                          // onChange={(e) => setIsAcc(e.target.value)}
                        />
                        <label htmlFor="floatingInput">
                          Gayarh-ween Expenses
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row g-3 my-2">
                  <div className="col-12">
                    <div className="p-3 bg-white shadow-sm d-flex justify-content-around align-items-center rounded">
                      <div className="form-floating w-100">
                        <input
                          type="text"
                          className="form-control"
                          id="name"
                          defaultValue={bookObj.chattifund || "" || null}
                          placeholder="Name"
                          ref={chattifund}
                          // onChange={(e) => setIsName(e.target.value)}
                        />
                        <label htmlFor="floatingInput">
                          Chatti Funds Raised
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="p-3 bg-white shadow-sm d-flex justify-content-around align-items-center rounded">
                      <div className="form-floating w-100">
                        <input
                          type="text"
                          className="form-control"
                          id="place"
                          defaultValue={bookObj.chattiactivities || "" || null}
                          placeholder="Place"
                          ref={chattiactivities}
                          // onChange={(e) => setIsAddress(e.target.value)}
                        />
                        <label htmlFor="floatingInput">Chatti Activities</label>
                      </div>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="p-3 bg-white shadow-sm d-flex justify-content-around align-items-center rounded">
                      <div className="form-floating w-100">
                        <input
                          type="text"
                          className="form-control"
                          id="number"
                          defaultValue={bookObj.chattiexpenses || "" || null}
                          placeholder="Number"
                          ref={chattiexpenses}
                          // onChange={(e) => setIsMember(e.target.value)}
                        />
                        <label htmlFor="floatingInput">Chatti Expenses</label>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row g-3 my-2">
                  <div className="col-12">
                    <div className="p-3 bg-white shadow-sm d-flex justify-content-around align-items-center rounded">
                      <div className="form-floating w-100">
                        <input
                          type="text"
                          className="form-control"
                          id="name"
                          defaultValue={
                            bookObj.ursetajushariyafund || "" || null
                          }
                          placeholder="Name"
                          ref={ursetajushariyafund}
                          // onChange={(e) => setIsName(e.target.value)}
                        />
                        <label htmlFor="floatingInput">
                          URS E Tajushariyah Funds Raised
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="p-3 bg-white shadow-sm d-flex justify-content-around align-items-center rounded">
                      <div className="form-floating w-100">
                        <input
                          type="text"
                          className="form-control"
                          id="place"
                          defaultValue={
                            bookObj.ursetajushariyaactivities || "" || null
                          }
                          placeholder="Place"
                          ref={ursetajushariyaactivities}
                          // onChange={(e) => setIsAddress(e.target.value)}
                        />
                        <label htmlFor="floatingInput">
                          URS E Tajushariyah Activities
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="p-3 bg-white shadow-sm d-flex justify-content-around align-items-center rounded">
                      <div className="form-floating w-100">
                        <input
                          type="text"
                          className="form-control"
                          id="number"
                          defaultValue={
                            bookObj.ursetajushariyaexpenses || "" || null
                          }
                          placeholder="Number"
                          ref={ursetajushariyaexpenses}
                          // onChange={(e) => setIsMember(e.target.value)}
                        />
                        <label htmlFor="floatingInput">
                          URS E Tajushariyah Expenses
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row g-3 my-2">
                  <div className="col-12">
                    <div className="p-3 bg-white shadow-sm d-flex justify-content-around align-items-center rounded">
                      <div className="form-floating w-100">
                        <input
                          type="text"
                          className="form-control"
                          id="name"
                          defaultValue={bookObj.urserazviyafund || "" || null}
                          placeholder="Name"
                          ref={urserazviyafund}
                          // onChange={(e) => setIsName(e.target.value)}
                        />
                        <label htmlFor="floatingInput">
                          URS E Razviya Funds Raised
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="p-3 bg-white shadow-sm d-flex justify-content-around align-items-center rounded">
                      <div className="form-floating w-100">
                        <input
                          type="text"
                          className="form-control"
                          id="place"
                          defaultValue={
                            bookObj.urserazviyaactivities || "" || null
                          }
                          placeholder="Place"
                          ref={urserazviyaactivities}
                          // onChange={(e) => setIsAddress(e.target.value)}
                        />
                        <label htmlFor="floatingInput">
                          URS E Razviya Activities
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="p-3 bg-white shadow-sm d-flex justify-content-around align-items-center rounded">
                      <div className="form-floating w-100">
                        <input
                          type="text"
                          className="form-control"
                          id="number"
                          defaultValue={
                            bookObj.urserazviyaexpenses || "" || null
                          }
                          placeholder="Number"
                          ref={urserazviyaexpenses}
                          // onChange={(e) => setIsMember(e.target.value)}
                        />
                        <label htmlFor="floatingInput">
                          URS E Razviya Expenses
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row g-3 my-2">
                  <div className="col-12">
                    <div className="p-3 bg-white shadow-sm d-flex justify-content-around align-items-center rounded">
                      <div className="form-floating w-100">
                        <input
                          type="text"
                          className="form-control"
                          id="name"
                          defaultValue={
                            bookObj.ursemuftieazamyafund || "" || null
                          }
                          placeholder="Name"
                          ref={ursemuftieazamyafund}
                          // onChange={(e) => setIsName(e.target.value)}
                        />
                        <label htmlFor="floatingInput">
                          URS E Mufti Azam E Hind Funds Raised
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="p-3 bg-white shadow-sm d-flex justify-content-around align-items-center rounded">
                      <div className="form-floating w-100">
                        <input
                          type="text"
                          className="form-control"
                          id="place"
                          defaultValue={
                            bookObj.ursemuftieazamactivities || "" || null
                          }
                          placeholder="Place"
                          ref={ursemuftieazamactivities}
                          // onChange={(e) => setIsAddress(e.target.value)}
                        />
                        <label htmlFor="floatingInput">
                          URS E Mufti Azam E Hind Activities
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="p-3 bg-white shadow-sm d-flex justify-content-around align-items-center rounded">
                      <div className="form-floating w-100">
                        <input
                          type="text"
                          className="form-control"
                          id="number"
                          defaultValue={
                            bookObj.ursemuftieazamexpenses || "" || null
                          }
                          placeholder="Number"
                          ref={ursemuftieazamexpenses}
                          // onChange={(e) => setIsMember(e.target.value)}
                        />
                        <label htmlFor="floatingInput">
                          URS E Mufti Azam E Hind Expenses
                        </label>
                      </div>
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

export default Jalsa;
