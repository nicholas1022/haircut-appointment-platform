import { createContext, useContext, useState, useEffect } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";

import { auth } from "../config/firebase";
// import { ObjectId } from "mongodb";
import { jwtDecode } from "jwt-decode";
import {getStylistDetails} from "../network/stylistCrud";
import {getUser} from "../network/userProfile";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [userInfo, setUserInfo] = useState("");

  function register(email, password) {
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            console.log(user);
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage);
            // ..
        });
  }

  async function login(email, password) {
    console.log("AuthContext login");
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (e) {
        console.log("Log in error: " + e);
    }
  }

  function logout() {
    return signOut(auth);
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const decoded = jwtDecode(user.stsTokenManager.accessToken);
        if (decoded.role?.toUpperCase() === "STYLIST") {
          await getStylistDetails(user.uid).then((stylist) => {
            setUserInfo({
              role: decoded.role,
              firstName: stylist.firstName,
              lastName: stylist.lastName,
            });
          });
        } else if (decoded.role?.toUpperCase() === "CUSTOMER") {
          await getUser(user.uid).then((user) => {
            setUserInfo({
              role: decoded.role,
              firstName: user.firstName,
              lastName: user.lastName,
            });
          });
        }
      }

        setCurrentUser(user);
        setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    error,
    setError,
    userInfo,
    login,
    register,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}