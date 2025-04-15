import { createContext, useContext, useEffect, useReducer } from "react";
import reducer from "../reducer/UserReducer";
import { CREATE_NEW_USER, SIGN_OUT_USER } from "../actions";
import { auth, db, provider } from "../config/Config";
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithRedirect,
  signInWithPopup,
  getRedirectResult,
  signOut as firebaseSignOut,
} from "firebase/auth";
import { toast } from "react-toastify";
import { doc, getDoc } from "firebase/firestore";

const UserContext = createContext();

// Get local storage cart data
const getLocalStorage = () => {
  const cart = localStorage.getItem("cart");
  return cart ? JSON.parse(cart) : [];
};

// Custom hook for consuming UserContext
export const useUserContext = () => useContext(UserContext);

const initialState = {
  current_user: null,
  userLogged: false,
  user_cart: getLocalStorage(),
  current_user_id: null,
};

const UserContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Function to create a new user in the state
  const createUser = (user, id) => {
    dispatch({ type: CREATE_NEW_USER, payload: { user, uid: id } });
  };

  // Function to sign out user
  const signOut = async () => {
    try {
      await firebaseSignOut(auth);
      dispatch({ type: SIGN_OUT_USER });
      toast.info("Signed out successfully");
    } catch (error) {
      console.error("Sign Out Error:", error.message);
      toast.error(error.message);
    }
  };

  // Read cart data from Firestore
  const readData = async (userId) => {
    if (!userId) return;

    try {
      const docRef = doc(db, "users", userId, "cart");
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        dispatch({
          type: "CREATE_EXISTING_CART",
          payload: docSnap.data().cart,
        });
      } else {
        console.log("No cart data found!");
      }
    } catch (error) {
      console.error("Error fetching cart data:", error);
    }
  };

  // Monitor auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        createUser(user.displayName, user.uid);
        readData(user.uid);
      } else {
        dispatch({ type: SIGN_OUT_USER });
      }
    });

    return () => unsubscribe();
  }, []);

  // Handle Google sign-in with popup
  const createSignUp = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      createUser(user.displayName, user.uid);
      toast.success(`Welcome ${user.displayName}`);
    } catch (error) {
      console.error("Google Sign-In Error:", error.message);
      toast.error(error.message);
    }
  };

  // Handle Google sign-in with redirect
  const googleSignUp = () => {
    signInWithRedirect(auth, provider);
  };

  // Handle redirect results after Google sign-in
  useEffect(() => {
    const handleRedirectResult = async () => {
      try {
        const result = await getRedirectResult(auth);
        if (result) {
          const user = result.user;
          createUser(user.displayName, user.uid);
          toast.success(`Welcome ${user.displayName}`);
        }
      } catch (error) {
        console.error("Google Sign-In Error:", error.message);
        toast.error(error.message);
      }
    };

    handleRedirectResult();
  }, []);

  return (
    <UserContext.Provider
      value={{ ...state, createSignUp, googleSignUp, signOut }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
