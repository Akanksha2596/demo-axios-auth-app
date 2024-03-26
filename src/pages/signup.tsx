import React, { useState } from "react";
import axiosInstance from "@/utils/axiosInstance";
// import SIGNUP_MUTATION from "@/utils/queries";
import { useRouter } from "next/router";

const SignupForm = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleSignup = async () => {
    try {
      const response = await axiosInstance.post("/graphql", {
        query: `mutation registerUser($username: String!, $email: String!, $password: String!) {
                register(input: {
                username: $username
                email: $email
                password: $password
                }) {
                jwt
                }
            }`,
        variables: {
          username,
          email,
          password,
        },
      });

      const jwt = response.data.data.register.jwt;
      localStorage.setItem("jwtToken", jwt);
      // redirect to a different page after successful signup
      router.push("/login");
    } catch (error: any) {
      setError(error.response);
    }
  };

  return (
    <div className="container">
      <h2 className="title">Sign Up</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleSignup}>Sign Up</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default SignupForm;
