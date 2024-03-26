import React, { useState } from "react";
import axiosInstance from "@/utils/axiosInstance";
import { handleAuthentication } from "@/utils/authService";
// import LOGIN_MUTATION from "@/utils/queries";
import { useRouter } from "next/router";


const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleLogin = async () => {
    try {
      const response = await axiosInstance.post("/graphql", {
        query:`mutation UserSignIn($input: UsersPermissionsLoginInput!) {
            login(input: $input) {
              jwt
              user {
                email
                id
              }
            }
          }`,
        variables: {
          input: {
            identifier: username,
            password: password,
          },
        },
      });
      const { jwt } = response.data.data.login;
      handleAuthentication(jwt);
      // navigate to dashboard on successful login
      router.push("/dashboard");
    } catch (error: any) {
      setError(error.response);
    }
  };

  return (
    <>
      <p >Provide valid credential to login app </p>
      <div className="container">
        <h1 className="title">Login</h1>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button onClick={handleLogin} >
          Login
        </button>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>
    </>
  );
};

export default LoginPage;
