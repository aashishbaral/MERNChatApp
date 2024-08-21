import { AxiosError } from "axios";
import { useCallback, useState } from "react";
import toast from "react-hot-toast";
import { z } from "zod";
import { useAuth } from "../context/AuthContext";
import { API } from "../http/http";
import { LoginSchema } from "../pages/auth/Login";

export const useLogin = () => {
  const [loading, setLoading] = useState(false);

  const { setAuthUser } = useAuth();

  const login = useCallback(async (loginData: z.infer<typeof LoginSchema>) => {
    setLoading(true);
    try {
      const { data } = await API.post("/auth/login", loginData);
      if (!data.status) {
        throw new Error(data.message);
      }
      localStorage.setItem("user", JSON.stringify(data.data));
      setAuthUser(data.data);
      return true;
    } catch (error) {
      const errorMessage =
        error instanceof AxiosError && error.response?.data?.message
          ? error.response.data.message
          : "An error occurred. Please try again later.";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  return { login, loading };
};
