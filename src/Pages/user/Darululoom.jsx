import { useEffect, useState, useRef } from "react";
import UserNavigation from "../../Components/user/UserNavigation";
import Swal from "sweetalert2";
import { Navigate } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const Darululoom = ({ Toggle }) => {
  // eslint-disable-next-line no-unused-vars
  const [isEditMode, setIsEditMode] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const names = useRef();
  const places = useRef();
  const nofstudents = useRef();
  const facilityprovided = useRef();
  const mudarrisdetails = useRef();
  const coursesavailable = useRef();
  const dastabandidetails = useRef();
  const noftalabafarig = useRef();
  const mainId = useRef();
  const [userId, setUserId] = useState("");
  const [userObj, setUserObj] = useState([]);
  const [bookObj, setBookObj] = useState({});
  const [bookId, setBookId] = useState("");

  useEffect(() => {
    const user = localStorage.getItem("user");
    const parsed = JSON.parse(user);
    console.log(parsed);
    setUserId(parsed);
    fetchData(parsed.id);
  }, []);
  //here
  const fetchData = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/darul/darululoomByUserID/${id}`,
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
    const conf = confirm("Are you sure to remove this Darululoom?");
    if (conf) {
      const response = await fetch(
        "http://localhost:8080/api/darul/deletedarululoom/" + id,
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
          title: "Darululoom Deleted successfully!",
        });
        window.location.reload();
      }
    }
  };

  const getBookDataByID = async (id) => {
    // console.log("empty book object -> ", bookObj);
    // console.log(mainId);
    const response = await fetch(
      "http://localhost:8080/api/darul/darululoomByID/" + id,
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
      names: names.current.value,
      nofstudents: nofstudents.current.value,
      places: places.current.value,
      facilityprovided: facilityprovided.current.value,
      mudarrisdetails: mudarrisdetails.current.value,
      coursesavailable: coursesavailable.current.value,
      dastabandidetails: dastabandidetails.current.value,
      noftalabafarig: noftalabafarig.current.value,
      userId: userId.id,
    };

    if (names.current.value === "") {
      Swal.fire({
        icon: "warning",
        title: "Please enter Name",
      });
    } else if (places.current.value === "") {
      Swal.fire({
        icon: "warning",
        title: "Please enter Place",
      });
    } else if (nofstudents.current.value === "") {
      Swal.fire({
        icon: "warning",
        title: "Please enter Work in Progress",
      });
    } else if (facilityprovided.current.value === "") {
      Swal.fire({
        icon: "warning",
        title: "Please enter Activities",
      });
    } else if (mudarrisdetails.current.value === "") {
      Swal.fire({
        icon: "warning",
        title: "Please enter Funds Raised",
      });
    } else if (coursesavailable.current.value === "") {
      Swal.fire({
        icon: "warning",
        title: "Please enter Masjid Maintainance",
      });
    } else if (dastabandidetails.current.value === "") {
      Swal.fire({
        icon: "warning",
        title: "Please enter Masjid Maintainance",
      });
    } else if (noftalabafarig.current.value === "") {
      Swal.fire({
        icon: "warning",
        title: "Please enter Masjid Maintainance",
      });
    } else {
      const response = await fetch(
        "http://localhost:8080/api/darul/adddarululoom",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(obb),
        }
      );

      if (response.status === 201) {
        setIsSuccess(true);
        Swal.fire({
          icon: "success",
          title: "New Darululoom Added successfully!",
        });
      }
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    // console.log("user id is ->  ", userId);
    // console.log("main _id is -> ", bookId);
    const obb = {
      names: names.current.value,
      nofstudents: nofstudents.current.value,
      places: places.current.value,
      facilityprovided: facilityprovided.current.value,
      mudarrisdetails: mudarrisdetails.current.value,
      coursesavailable: coursesavailable.current.value,
      dastabandidetails: dastabandidetails.current.value,
      noftalabafarig: noftalabafarig.current.value,
      userId: userId.id,
    };
    if (names.current.value === "") {
      Swal.fire({
        icon: "warning",
        title: "Please enter Name",
      });
    } else if (places.current.value === "") {
      Swal.fire({
        icon: "warning",
        title: "Please enter Place",
      });
    } else if (nofstudents.current.value === "") {
      Swal.fire({
        icon: "warning",
        title: "Please enter Work in Progress",
      });
    } else if (facilityprovided.current.value === "") {
      Swal.fire({
        icon: "warning",
        title: "Please enter Activities",
      });
    } else if (mudarrisdetails.current.value === "") {
      Swal.fire({
        icon: "warning",
        title: "Please enter Funds Raised",
      });
    } else if (coursesavailable.current.value === "") {
      Swal.fire({
        icon: "warning",
        title: "Please enter Masjid Maintainance",
      });
    } else if (dastabandidetails.current.value === "") {
      Swal.fire({
        icon: "warning",
        title: "Please enter Masjid Maintainance",
      });
    } else if (noftalabafarig.current.value === "") {
      Swal.fire({
        icon: "warning",
        title: "Please enter Masjid Maintainance",
      });
    } else {
      const response = await fetch(
        "http://localhost:8080/api/darul/updatedarululoom/" + bookId,
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
          title: "Darululoom Updated successfully!",
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
          <h3 className="text-center text-dark">Darul-Ulooms</h3>
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
                names.current.value = "";
                places.current.value = "";
                nofstudents.current.value = "";
                facilityprovided.current.value = "";
                mudarrisdetails.current.value = "";
                coursesavailable.current.value = "";
                dastabandidetails.current.value = "";
                noftalabafarig.current.value = "";
                mainId.current.value = "";
              }}
            >
              Add New <i className="bi bi-plus-square-fill"></i>
            </button>
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
                <th scope="col">Edit</th>
                <th scope="col">Delete</th>
              </tr>
            </thead>
            <tbody>
              {userObj.map((item, index) => (
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
                Add New / Update Darul-Ulooms Details
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
                        defaultValue={bookObj.names}
                        placeholder="Name"
                        ref={names}
                        // onChange={(e) => setIsName(e.target.value)}
                      />
                      <label htmlFor="floatingInput">Name</label>
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
                        defaultValue={bookObj.places || "" || null}
                        placeholder="Book name"
                        ref={places}
                        // onChange={(e) => setIsAddress(e.target.value)}
                      />
                      <label htmlFor="floatingInput">Places</label>
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
                        defaultValue={bookObj.nofstudents || "" || null}
                        placeholder="avail"
                        ref={nofstudents}
                        // onChange={(e) => setIsMember(e.target.value)}
                      />
                      <label htmlFor="floatingInput">Number of Students</label>
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
                        defaultValue={bookObj.facilityprovided || "" || null}
                        placeholder="avail"
                        ref={facilityprovided}
                        // onChange={(e) => setIsMember(e.target.value)}
                      />
                      <label htmlFor="floatingInput">Facility Provided</label>
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
                        defaultValue={bookObj.mudarrisdetails || "" || null}
                        placeholder="avail"
                        ref={mudarrisdetails}
                        // onChange={(e) => setIsMember(e.target.value)}
                      />
                      <label htmlFor="floatingInput">Mudarris Details</label>
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
                        defaultValue={bookObj.coursesavailable || "" || null}
                        placeholder="avail"
                        ref={coursesavailable}
                        // onChange={(e) => setIsMember(e.target.value)}
                      />
                      <label htmlFor="floatingInput">Courses Available</label>
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
                        defaultValue={bookObj.dastabandidetails || "" || null}
                        placeholder="avail"
                        ref={dastabandidetails}
                        // onChange={(e) => setIsMember(e.target.value)}
                      />
                      <label htmlFor="floatingInput">Dastarbandi Details</label>
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
                        defaultValue={bookObj.noftalabafarig || "" || null}
                        placeholder="avail"
                        ref={noftalabafarig}
                        // onChange={(e) => setIsMember(e.target.value)}
                      />
                      <label htmlFor="floatingInput">
                        Number of Talaba Farig
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

export default Darululoom;
