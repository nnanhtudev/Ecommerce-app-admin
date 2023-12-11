import React, { useState, useEffect, useContext } from "react";
// import { useNavigate } from 'react-router-dom';
import UserAPI from "../API/UserAPI";
import { AuthContext } from "../Context/AuthContext";

import "./Login.css";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { UserContext } from "../Context/UserContext";

const Login = () => {
  let history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { loginContext } = useContext(UserContext);
  const { loading, error, dispatch } = useContext(AuthContext);
  // const navigate = useNavigate();

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const response = await UserAPI.getAllData();

  //     setUser(response.DT);
  //   };

  //   fetchData();
  // }, []);

  const handleSubmit = async () => {
    let data = {
      email,
      password,
    };
    let response = await UserAPI.postSignIn(data);
    if (response && response.EC === 0) {
      let roleUser = response.DT.roleUser;
      let id = response.DT.id;
      let fullName = response.DT.fullName;
      let token = response.DT.access_token;
      let data = {
        isAuthenticated: true,
        token,
        account: { roleUser, id, fullName },
      };
      toast.success(response.EM);
      loginContext(data);
      dispatch({ type: "LOGIN_SUCCESS", payload: response.DT });
      history.push("/");
    }
    if (response && response.EC === -2) {
      window.location.href = "http://localhost:3000/"; // Redirect to the client-side application
    }
    // const findUser = user.find((value) => {
    //   return value.email === email;
    // });

    // if (findUser && findUser.password === password) {
    //   dispatch({ type: "LOGIN_SUCCESS", payload: findUser });
    //   // navigate("/")
    // } else {
    //   alert("Email or password wrong!");
    // }

    // if (findUser.password !== password) {
    // 	setErrorPassword(true);
    // 	return;
    // } else {
    // 	setErrorPassword(false);

    // 	localStorage.setItem('id_user', findUser._id);

    // 	localStorage.setItem('name_user', findUser.fullname);

    // 	const action = addSession(localStorage.getItem('id_user'));
    // 	dispatch(action);

    // 	setCheckPush(true);
    // }
  };

  return (
    <div className="page-wrapper">
      <div className="page-breadcrumb">
        <div className="row">
          <div className="login">
            <div className="heading">
              <h2>Sign in</h2>
              <form action="#">
                <div className="input-group input-group-lg">
                  <span className="input-group-addon">
                    <i className="fa fa-user"></i>
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="input-group input-group-lg">
                  <span className="input-group-addon">
                    <i className="fa fa-lock"></i>
                  </span>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                <button type="button" className="float" onClick={handleSubmit}>
                  Login
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
