import React, { useState, useRef } from "react";
import { useMutation } from "react-query";
import { useNavigate } from 'react-router-dom'
import Cookies from "js-cookie";
import { httpInterceptedService } from "../../core/http-service";
import { useAuthStore } from "../../store/auth";

const Login = () => {

  const navigate = useNavigate();
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);


  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { setUsernameStore, setPasswordStore } = useAuthStore();
  const login = useMutation(
    async (formData) => {
      // const { contact_line, password } = formData;
      const response = await httpInterceptedService.post(
        "/auth/login-with-password",
        formData
      );

      // const data = await response.json();

      // console.log(response);
      return response;
    },
    {
      onSuccess: (data) => {
        console.log(data.data.token);
        Cookies.set("token", data.data.token, { expires: 3 });
        navigate('/');
        setUsernameStore(formData.contact_line);
        setPasswordStore(formData.password);
      },
    },
    {
      oError: (error) => {
        console.log(error);
      },
    }
  );

  function onSubmit(event) {
    event.preventDefault();
    const formData = {
      contact_line: usernameRef.current.value,
      password: passwordRef.current.value,
    };

    // console.log(formData);
    login.mutate(formData);
  }
  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={onSubmit}>
        <div>
          <label htmlFor="username">Username: </label>
          <input
            type="text"
            id="username"
            ref={usernameRef}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password: </label>
          <input
            type="password"
            id="password"
            ref={passwordRef}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
