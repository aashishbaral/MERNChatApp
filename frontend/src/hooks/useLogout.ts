import { AxiosError } from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
import { API } from "../http/http";
import {
  setConversationUsers,
  setSelectedConversation,
} from "../redux/conversationSlice";
import { useAppDispatch } from "../redux/hooks";

const useLogout = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuth();
  const dispatch = useAppDispatch();
  const logout = async () => {
    setLoading(true);
    try {
      const { data } = await API.get("/auth/logout");

      if (!data.status) {
        throw new Error(data.message);
      }
      dispatch(setSelectedConversation(null));
      dispatch(setConversationUsers([]));
      localStorage.removeItem("user");
      setAuthUser(null);
    } catch (error) {
      const errorMessage =
        error instanceof AxiosError && error.response?.data?.message
          ? error.response.data.message
          : "An error occurred. Please try again later.";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return { logout, loading };
};

export default useLogout;
