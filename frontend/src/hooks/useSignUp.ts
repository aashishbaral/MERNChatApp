import { AxiosError } from "axios";
import { useCallback, useState } from "react";
import toast from "react-hot-toast";
import { z } from "zod";
import { useAuth } from "../context/AuthContext";
import { API } from "../http/http";
import { SignUpSchema } from "../pages/auth/Signup";

export const useSignUp = () => {
  const [loading, setLoading] = useState(false);

  const { setAuthUser } = useAuth();

  const signup = useCallback(
    async (registerData: z.infer<typeof SignUpSchema>) => {
      setLoading(true);
      try {
        const { data } = await API.post("/auth/register", registerData);
        if (!data.status) {
          throw new Error(data.message);
        }
        localStorage.setItem("user", JSON.stringify(data.data));
        setAuthUser(data.data);
        toast.success(data.message);
      } catch (error) {
        const errorMessage =
          error instanceof AxiosError && error.response?.data?.message
            ? error.response.data.message
            : "An error occurred. Please try again later.";
        toast.error(errorMessage);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return { signup, loading };
};
