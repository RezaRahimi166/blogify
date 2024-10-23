"use client";
import { getUserApi, signinApi, signupApi } from "@/services/authService";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { createContext, useReducer, useContext, useEffect } from "react";

const AuthContext = createContext();

const initialState = {
  user: null,
  isAuthenticated: false,
  isLoading: true,
  error: null,
};

const authReducer = (state, action) => {
  switch (action.type) {
    case "loading": {
      return { ...state, isLoading: true };
    }
    case "rejected": {
      return { ...state, isLoading: false, error: action.payload };
    }
    case "singin": {
      return { user: action.payload, isAuthenticated: true };
    }
    case "singup": {
      return { user: action.payload, isAuthenticated: true };
    }
    case "user/loaded": {
      return { user: action.payload, isAuthenticated: true };
    }
  }
};

export default function AuthProvider({ children }) {
  const router = useRouter();
  const [{ user, isAuthenticated, isLoading, error }, dispatch] = useReducer(
    authReducer,
    initialState
  );

  async function signin(values) {
    dispatch({ type: "loading" });
    try {
      const { user, message } = await signinApi(values);
      dispatch({ type: "signin", payload: user });
      toast.success(message);
      router.push("profile");
    } catch (error) {
      const errorMsj = error?.response?.data?.message;
      dispatch({ type: "rejected", payload: errorMsj });
      toast.error(errorMsj);
    }
  }

  async function signup(values) {
    dispatch({ type: "loading" });
    try {
      const { user, message } = await signupApi(values);
      dispatch({ type: "signup", payload: user });
      toast.success(message);
      router.push("profile");
    } catch (error) {
      const errorMsj = error?.response?.data?.message;
      dispatch({ type: "rejected", payload: errorMsj });
      toast.error(errorMsj);
    }
  }
  async function getUser() {
    dispatch({ type: "loading" });
    try {
      const { user } = await getUserApi();
      dispatch({ type: "user/loaded", payload: user });
    } catch (error) {
      const errorMsj = error?.response?.data?.message;
      dispatch({ type: "rejected", payload: errorMsj });
      toast.error(errorMsj);
    }
  }

  // useEffect(() => {
  //   async function fetchData() {
  //     await getUser();
  //   }

  //   return fetchData();
  // }, []);

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, isLoading, signin, signup }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined)
    throw new Error("auth context used out side provider");

  return context;
}
