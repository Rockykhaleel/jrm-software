import { useRef, useState } from "react";
import { Navigate } from "react-router-dom";
import "./Login.css";
import logo from "../assets/logo-new-JRM-2685501165.png";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";

const Login = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isEmail, setIsEmail] = useState("");
  const [isPassword, setIsPassword] = useState("");

  const dispatch = useDispatch();

  const emailRef = useRef();
  const passwordRef = useRef();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (isEmail === "") {
      Swal.fire({
        icon: "warning",
        title: "Please enter Email",
      });
    } else if (isPassword === "") {
      Swal.fire({
        icon: "warning",
        title: "Please enter password",
      });
    }
    // else if (isEmail == "superadmin" && isPassword == "superadmin") {

    // }
    else {
      const response = await fetch("http://localhost:8080/api/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: emailRef.current.value,
          password: passwordRef.current.value,
        }),
      });
      // const data = await response.json();
      // console.log(data);
      if (response.status === 200) {
        const data = await response.json();
        console.log(data);
        localStorage.setItem("token", data.result.token);
        localStorage.setItem("user", JSON.stringify(data.result.user));
        dispatch({ type: "Login_Success", payload: data.result.user });
        // Store the response data in local storage
        localStorage.setItem("userData", JSON.stringify(data));
        // Set isRegistered to true upon successful registration
        if (data.result.user.role == "admin") {
          setIsLoggedIn(true);
        } else {
          setIsAdmin(true);
        }
        Swal.fire({
          icon: "success",
          title: "Logged in successfully!",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Username or password is incorrect",
        });
      }
    }
  };

  if (isLoggedIn) {
    // Redirect to login page if registration was successful
    return <Navigate to="/dashboard" />;
  }
  if (isAdmin) {
    // Redirect to login page if registration was successful
    return <Navigate to="/superdashboard" />;
  }

  return (
    <div className="main">
      <div className="card" style={{ width: "18rem" }}>
        <div className="card-body">
          <div className="container">
            <img src={logo} id="image" alt="" />
            {/* width="250px" height="230px" */}
            <form className="form" onSubmit={handleLogin}>
              <div className="mb-3 ">
                <label className="form-label">User Name</label>
                <input
                  type="username"
                  className="form-control"
                  id="exampleInputusername"
                  placeholder="username"
                  ref={emailRef}
                  onChange={(e) => setIsEmail(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="exampleInputPassword1"
                  placeholder="password"
                  onChange={(e) => setIsPassword(e.target.value)}
                  ref={passwordRef}
                />
              </div>
              <button type="submit" className="btn" id="buttoned">
                {/* style="" */}
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
