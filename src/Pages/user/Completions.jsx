import { useEffect, useState, useRef } from "react";
import UserNavigation from "../../Components/user/UserNavigation";
import Swal from "sweetalert2";
import { Navigate } from "react-router-dom";
import BASE_URL from "../../../apiConfig";

// eslint-disable-next-line react/prop-types
const Completions = ({ Toggle }) => {
  // eslint-disable-next-line no-unused-vars
  const [isEditMode, setIsEditMode] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const tyocompetion = useRef();
  const dateorganized = useRef();
  const nospasticipated = useRef();
  const winners = useRef();
  const prizes = useRef();
  const expenses = useRef();
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
        BASE_URL + "competions/deletecompetions/" + id,
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
          title: "Competions Deleted successfully!",
        });
        window.location.reload();
      }
    }
  };

  const getBookDataByID = async (id) => {
    // console.log("empty book object -> ", bookObj);
    // console.log(mainId);
    const response = await fetch(BASE_URL + "competions/competionsByID/" + id, {
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
      tyocompetion: tyocompetion.current.value,
      dateorganized: dateorganized.current.value,
      nospasticipated: nospasticipated.current.value,
      winners: winners.current.value,
      prizes: prizes.current.value,
      expenses: expenses.current.value,
      userId: userId.id,
    };

    if (tyocompetion.current.value === "") {
      Swal.fire({
        icon: "warning",
        title: "Please enter Type of Competition!",
      });
    } else if (dateorganized.current.value === "") {
      Swal.fire({
        icon: "warning",
        title: "Please enter Date Organized",
      });
    } else if (nospasticipated.current.value === "") {
      Swal.fire({
        icon: "warning",
        title: "Please enter Number of Participants",
      });
    } else if (winners.current.value === "") {
      Swal.fire({
        icon: "warning",
        title: "Please enter winners",
      });
    } else if (prizes.current.value === "") {
      Swal.fire({
        icon: "warning",
        title: "Please enter prizes",
      });
    } else if (expenses.current.value === "") {
      Swal.fire({
        icon: "warning",
        title: "Please enter expenses",
      });
    } else {
      const response = await fetch(BASE_URL + "competions/addcompetions", {
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
          title: "New Competion Added successfully!",
        });
      }
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    // console.log("user id is ->  ", userId);
    // console.log("main _id is -> ", bookId);
    const obb = {
      tyocompetion: tyocompetion.current.value,
      dateorganized: dateorganized.current.value,
      nospasticipated: nospasticipated.current.value,
      winners: winners.current.value,
      prizes: prizes.current.value,
      expenses: expenses.current.value,
      userId: userId.id,
    };
    if (tyocompetion.current.value === "") {
      Swal.fire({
        icon: "warning",
        title: "Please enter Type of Competition!",
      });
    } else if (dateorganized.current.value === "") {
      Swal.fire({
        icon: "warning",
        title: "Please enter Date Organized",
      });
    } else if (nospasticipated.current.value === "") {
      Swal.fire({
        icon: "warning",
        title: "Please enter Number of Participants",
      });
    } else if (winners.current.value === "") {
      Swal.fire({
        icon: "warning",
        title: "Please enter winners",
      });
    } else if (prizes.current.value === "") {
      Swal.fire({
        icon: "warning",
        title: "Please enter prizes",
      });
    } else if (expenses.current.value === "") {
      Swal.fire({
        icon: "warning",
        title: "Please enter expenses",
      });
    } else {
      const response = await fetch(
        BASE_URL + "competions/updatecompetions/" + bookId,
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
          title: "Competion Updated successfully!",
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
          <h3 className="text-center text-dark">Competions Organized</h3>
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
                tyocompetion.current.value = "";
                dateorganized.current.value = "";
                nospasticipated.current.value = "";
                winners.current.value = "";
                prizes.current.value = "";
                expenses.current.value = "";
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
                <th scope="col">Type of competition</th>
                <th scope="col">Date Organized</th>
                <th scope="col">Number of Participants</th>
                <th scope="col">Winners</th>
                <th scope="col">Prizes</th>
                <th scope="col">Expenses</th>
                <th scope="col">Edit</th>
                <th scope="col">Delete</th>
              </tr>
            </thead>
            <tbody>
              {userObj.map((item, index) => (
                <tr key={index}>
                  <th scope="row"></th>
                  <td>{item.tyocompetion}</td>
                  <td>{item.dateorganized}</td>
                  <td>{item.nospasticipated}</td>
                  <td>{item.winners}</td>
                  <td>{item.prizes}</td>
                  <td>{item.expenses}</td>
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
                Add New / Update Competitions Details
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
                        defaultValue={bookObj.tyocompetion}
                        placeholder="Name"
                        ref={tyocompetion}
                        // onChange={(e) => setIsName(e.target.value)}
                      />
                      <label htmlFor="floatingInput">
                        Type of Competitions
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
                        id="bookname"
                        defaultValue={bookObj.dateorganized || "" || null}
                        placeholder="Book name"
                        ref={dateorganized}
                        // onChange={(e) => setIsAddress(e.target.value)}
                      />
                      <label htmlFor="floatingInput">Date Organized</label>
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
                        defaultValue={bookObj.nospasticipated || "" || null}
                        placeholder="avail"
                        ref={nospasticipated}
                        // onChange={(e) => setIsMember(e.target.value)}
                      />
                      <label htmlFor="floatingInput">
                        Number of Participants
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
                        id="avail"
                        defaultValue={bookObj.winners || "" || null}
                        placeholder="avail"
                        ref={winners}
                        // onChange={(e) => setIsMember(e.target.value)}
                      />
                      <label htmlFor="floatingInput">Winners</label>
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
                        defaultValue={bookObj.prizes || "" || null}
                        placeholder="avail"
                        ref={prizes}
                        // onChange={(e) => setIsMember(e.target.value)}
                      />
                      <label htmlFor="floatingInput">Prizes</label>
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
                        defaultValue={bookObj.expenses || "" || null}
                        placeholder="avail"
                        ref={expenses}
                        // onChange={(e) => setIsMember(e.target.value)}
                      />
                      <label htmlFor="floatingInput">Expenses</label>
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

export default Completions;
