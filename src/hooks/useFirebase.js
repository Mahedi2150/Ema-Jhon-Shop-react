
import { useState, useEffect } from 'react';
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, signOut, getIdToken } from "firebase/auth";
import initializeAuthentication from './../Firebase/firebase.inti';
initializeAuthentication();
const useFirebase = () => {
  const [user, setUser] = useState({});

  const auth = getAuth();
  const googlrProvider = new GoogleAuthProvider();

  const signInUsingGoogle = () => {
    return signInWithPopup(auth, googlrProvider)

  }
  const logout = () => {
    signOut(auth)
      .then(() => {
        setUser({})
      })
  }
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        getIdToken(user)
          .then(idToken => localStorage.setItem('idToken', idToken))
        setUser(user)
      }
    });
  }, [])
  return {
    user,
    signInUsingGoogle,
    logout
  }
}
export default useFirebase;