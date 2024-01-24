// import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../../config/firebase";
import { useAuth } from "../../contexts/AuthContext";
import GetCustomerByID from "./GetCustomerByID";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { currentUser, login, setError } = useAuth();

  const signIn = async (e) => {
    e.preventDefault();
    try {
      setError("");
      setLoading(true);
      await login(email, password);
    } catch (e) {
      setError("Failed to login");
    }

    const fetch = async () => {
      try {
        const currentUser = auth.currentUser;
        console.log("CURRENT USER: " + JSON.stringify(currentUser));
        const t = currentUser && (await currentUser.getIdToken());
        console.log("TOKEN: " + t);
        // setToken(t);
      } catch (e) {
        console.log(e);
      }
    }
    fetch();

    setLoading(false);
  };

  return (
    <div className="sign-in-container">
      <form onSubmit={signIn}>
        <h1>Log In to your Account</h1>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        ></input>
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        ></input>
        <button type="submit">Log In</button>
      </form>
    </div>
  );
};

export default SignIn;
