import { useEffect, useState, useRef } from "react";
import UserNavigation from "../../Components/user/UserNavigation";
import Swal from "sweetalert2";
import { Navigate } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const Social = ({ Toggle }) => {
  // eslint-disable-next-line no-unused-vars
  const [isEditMode, setIsEditMode] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const platform = useRef();
  const date = useRef();
  const typeofupload = useRef();
  const reach = useRef();
  const likes = useRef();
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
        `http://localhost:8080/api/social/socialByUserID/${id}`,
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
    const conf = confirm("Are you sure to remove this Competions?");
    if (conf) {
      const response = await fetch(
        "http://localhost:8080/api/social/deletesocial/" + id,
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
          title: "Social Deleted successfully!",
        });
        window.location.reload();
      }
    }
  };

  const getBookDataByID = async (id) => {
    // console.log("empty book object -> ", bookObj);
    // console.log(mainId);
    const response = await fetch(
      "http://localhost:8080/api/social/socialByID/" + id,
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
      platform: platform.current.value,
      date: date.current.value,
      typeofupload: typeofupload.current.value,
      reach: reach.current.value,
      likes: likes.current.value,
      userId: userId.id,
    };

    if (platform.current.value === "") {
      Swal.fire({
        icon: "warning",
        title: "Please enter platform!",
      });
    } else if (date.current.value === "") {
      Swal.fire({
        icon: "warning",
        title: "Please enter Date",
      });
    } else if (typeofupload.current.value === "") {
      Swal.fire({
        icon: "warning",
        title: "Please enter Type of upload",
      });
    } else if (reach.current.value === "") {
      Swal.fire({
        icon: "warning",
        title: "Please enter number people reach",
      });
    } else if (likes.current.value === "") {
      Swal.fire({
        icon: "warning",
        title: "Please enter number of likes",
      });
    } else {
      const response = await fetch(
        "http://localhost:8080/api/social/addsocial",
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
          title: "New Social Added successfully!",
        });
      }
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    // console.log("user id is ->  ", userId);
    // console.log("main _id is -> ", bookId);
    const obb = {
      platform: platform.current.value,
      date: date.current.value,
      typeofupload: typeofupload.current.value,
      reach: reach.current.value,
      likes: likes.current.value,
      userId: userId.id,
    };
    if (platform.current.value === "") {
      Swal.fire({
        icon: "warning",
        title: "Please enter platform!",
      });
    } else if (date.current.value === "") {
      Swal.fire({
        icon: "warning",
        title: "Please enter Date",
      });
    } else if (typeofupload.current.value === "") {
      Swal.fire({
        icon: "warning",
        title: "Please enter Type of upload",
      });
    } else if (reach.current.value === "") {
      Swal.fire({
        icon: "warning",
        title: "Please enter number people reach",
      });
    } else if (likes.current.value === "") {
      Swal.fire({
        icon: "warning",
        title: "Please enter number of likes",
      });
    } else {
      const response = await fetch(
        "http://localhost:8080/api/social/updatesocial/" + bookId,
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
          title: "Social Updated successfully!",
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
      {/* Social Media & IT Activities */}

      <div className="container-fluid">
        <div className="row bg-white g-3 my-2 pt-1 pb-2 mt-4 fw-bolder fs-2 rounded-3 shadow-sm">
          <h3 className="text-center text-dark">
            Social Media & IT Activities
          </h3>
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
                platform.current.value = "";
                date.current.value = "";
                typeofupload.current.value = "";
                reach.current.value = "";
                likes.current.value = "";
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
                <th scope="col">Platform Uploaded</th>
                <th scope="col">Date</th>
                <th scope="col">Type of upload</th>
                <th scope="col">Reaches</th>
                <th scope="col">Likes</th>
                <th scope="col">Edit</th>
                <th scope="col">Delete</th>
              </tr>
            </thead>
            <tbody>
              {userObj.map((item, index) => (
                <tr key={index}>
                  <th scope="row"></th>
                  <td>{item.platform}</td>
                  <td>{item.date}</td>
                  <td>{item.typeofupload}</td>
                  <td>{item.reach}</td>
                  <td>{item.likes}</td>
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
                Add New / Update Social Media & IT Activities
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
                        defaultValue={bookObj.platform}
                        placeholder="Name"
                        ref={platform}
                        // onChange={(e) => setIsName(e.target.value)}
                      />
                      <label htmlFor="floatingInput">Enter platform</label>
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
                        defaultValue={bookObj.date || "" || null}
                        placeholder="Book name"
                        ref={date}
                        // onChange={(e) => setIsAddress(e.target.value)}
                      />
                      <label htmlFor="floatingInput">Date</label>
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
                        defaultValue={bookObj.typeofupload || "" || null}
                        placeholder="avail"
                        ref={typeofupload}
                        // onChange={(e) => setIsMember(e.target.value)}
                      />
                      <label htmlFor="floatingInput">Type of Upload</label>
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
                        defaultValue={bookObj.reach || "" || null}
                        placeholder="avail"
                        ref={reach}
                        // onChange={(e) => setIsMember(e.target.value)}
                      />
                      <label htmlFor="floatingInput">Reaches</label>
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
                        defaultValue={bookObj.likes || "" || null}
                        placeholder="avail"
                        ref={likes}
                        // onChange={(e) => setIsMember(e.target.value)}
                      />
                      <label htmlFor="floatingInput">Number of likes</label>
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

export default Social;
