import { useEffect, useState, useRef } from "react";
import UserNavigation from "../../Components/user/UserNavigation";
import Swal from "sweetalert2";
import { Navigate } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const Masajid = ({ Toggle }) => {
  // eslint-disable-next-line no-unused-vars
  const [isEditMode, setIsEditMode] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const name = useRef();
  const places = useRef();
  const workpro = useRef();
  const activities = useRef();
  const fundsraised = useRef();
  const masajidman = useRef();
  const mainId = useRef();
  const [userId, setUserId] = useState("");
  const [userObj, setUserObj] = useState([]);
  const [bookObj, setBookObj] = useState({});
  const [bookId, setBookId] = useState("");

  useEffect(() => {
    const user = localStorage.getItem("user");
    const parsed = JSON.parse(user);
    setUserId(parsed);
    fetchData(parsed.id);
  }, []);
  //here
  const fetchData = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/masajid/masjidsByUserID/${id}`,
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
    const conf = confirm("Are you sure to remove this Makatibs?");
    if (conf) {
      const response = await fetch(
        "http://localhost:8080/api/masajid/deletemasjids/" + id,
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
          title: "Masajids Deleted successfully!",
        });
        window.location.reload();
      }
    }
  };

  const getBookDataByID = async (id) => {
    // console.log("empty book object -> ", bookObj);
    // console.log(mainId);
    const response = await fetch(
      "http://localhost:8080/api/masajid/masjidsByID/" + id,
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
      name: name.current.value,
      places: places.current.value,
      workpro: workpro.current.value,
      activities: activities.current.value,
      fundsraised: fundsraised.current.value,
      masajidman: masajidman.current.value,
      userId: userId.id,
    };
    if (name.current.value === "") {
      Swal.fire({
        icon: "warning",
        title: "Please enter name",
      });
    } else if (places.current.value === "") {
      Swal.fire({
        icon: "warning",
        title: "Please enter places",
      });
    } else if (workpro.current.value === "") {
      Swal.fire({
        icon: "warning",
        title: "Please enter work progress",
      });
    } else if (activities.current.value === "") {
      Swal.fire({
        icon: "warning",
        title: "Please enter activities",
      });
    } else if (fundsraised.current.value === "") {
      Swal.fire({
        icon: "warning",
        title: "Please enter fundsraised",
      });
    } else if (masajidman.current.value === "") {
      Swal.fire({
        icon: "warning",
        title: "Please enter books masajid managed",
      });
    } else {
      const response = await fetch(
        "http://localhost:8080/api/masajid/addmasjids",
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
          title: "New Masajid Added successfully!",
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
      places: places.current.value,
      workpro: workpro.current.value,
      activities: activities.current.value,
      fundsraised: fundsraised.current.value,
      masajidman: masajidman.current.value,
      userId: userId.id,
    };
    if (name.current.value === "") {
      Swal.fire({
        icon: "warning",
        title: "Please enter name",
      });
    } else if (places.current.value === "") {
      Swal.fire({
        icon: "warning",
        title: "Please enter places",
      });
    } else if (workpro.current.value === "") {
      Swal.fire({
        icon: "warning",
        title: "Please enter work progress",
      });
    } else if (activities.current.value === "") {
      Swal.fire({
        icon: "warning",
        title: "Please enter activities",
      });
    } else if (fundsraised.current.value === "") {
      Swal.fire({
        icon: "warning",
        title: "Please enter fundsraised",
      });
    } else if (masajidman.current.value === "") {
      Swal.fire({
        icon: "warning",
        title: "Please enter books masajid managed",
      });
    } else {
      const response = await fetch(
        "http://localhost:8080/api/masajid/updatemasjids/" + bookId,
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
          title: "Masajid Updated successfully!",
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
          <h3 className="text-center text-dark">Masjid Profile</h3>
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
                places.current.value = "";
                workpro.current.value = "";
                activities.current.value = "";
                fundsraised.current.value = "";
                masajidman.current.value = "";
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
                <th scope="col">Work progress</th>
                <th scope="col">Activities</th>
                <th scope="col">Funds raised</th>
                <th scope="col">Masajid managed</th>
                <th scope="col">Edit</th>
                <th scope="col">Delete</th>
              </tr>
            </thead>
            <tbody>
              {userObj.map((item, index) => (
                <tr key={index}>
                  <th scope="row"></th>
                  <td>{item.name}</td>
                  <td>{item.places}</td>
                  <td>{item.workpro}</td>
                  <td>{item.activities}</td>
                  <td>{item.fundsraised}</td>
                  <td>{item.masajidman}</td>
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
                        defaultValue={bookObj.workpro || "" || null}
                        placeholder="avail"
                        ref={workpro}
                        // onChange={(e) => setIsMember(e.target.value)}
                      />
                      <label htmlFor="floatingInput">Work progress</label>
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
                        defaultValue={bookObj.activities || "" || null}
                        placeholder="avail"
                        ref={activities}
                        // onChange={(e) => setIsMember(e.target.value)}
                      />
                      <label htmlFor="floatingInput">Activities</label>
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
                        defaultValue={bookObj.fundsraised || "" || null}
                        placeholder="avail"
                        ref={fundsraised}
                        // onChange={(e) => setIsMember(e.target.value)}
                      />
                      <label htmlFor="floatingInput">Funds raised</label>
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
                        defaultValue={bookObj.masajidman || "" || null}
                        placeholder="avail"
                        ref={masajidman}
                        // onChange={(e) => setIsMember(e.target.value)}
                      />
                      <label htmlFor="floatingInput">Masajid managed</label>
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

export default Masajid;
