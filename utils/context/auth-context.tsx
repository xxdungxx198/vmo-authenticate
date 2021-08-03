import React, { useContext, useState, useEffect } from "react";
import { ReactElement } from "react";
import { auth } from "../firebase";
import firebase from "firebase";
import router from "next/router";

const AuthContext = React.createContext(null);

interface PropsUser {
  children: ReactElement;
}

export function useAuth() {
  return useContext(AuthContext);
}

const AuthProvider: React.FC<PropsUser> = (props) => {
  const { children } = props;
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState<boolean>(true);

  const googleProvider = new firebase.auth.GoogleAuthProvider();
  const facebookProvider = new firebase.auth.FacebookAuthProvider();
  const githubProvider = new firebase.auth.GithubAuthProvider();

  const value = {
    currentUser,
    facebookProvider,
    googleProvider,
    githubProvider,
    socialMediaAuth,
    login,
    logout,
    register,
    resetPassword,
  };

  function register(email: string, password: string) {
    return auth.createUserWithEmailAndPassword(email, password);
  }

  function login(email: string, password: string) {
    return auth.signInWithEmailAndPassword(email, password);
  }

  function resetPassword(email: string) {
    return auth.sendPasswordResetEmail(email);
  }

  function logout() {
    firebase.auth().signOut();
  }

  function socialMediaAuth(provider) {
    return firebase
      .auth()
      .signInWithPopup(provider)
      .then((res) => {
        if (res.user) {
          setCurrentUser(res.user);
          router.push("/admin");
        }
      })
      .catch(alert);
  }

  useEffect(() => {
    const unSubcribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unSubcribe;
  }, []);

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
