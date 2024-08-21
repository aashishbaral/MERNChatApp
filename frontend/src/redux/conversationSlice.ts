import { createSlice, Dispatch } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import toast from "react-hot-toast";
import { API } from "../http/http";
import { Status } from "../types/globalTypes";
import { RootState } from "./store";

export type Conversation = {
  _id: string;
  messages: string[];
};

export type Message = {
  _id: string;
  message: string;
  senderId: string;
  receiverId: string;
  createdAt: string;
  updatedAt: string;
};

export interface ConversationUser {
  _id: string;
  email: string;
  fullName: string;
  gender: string;
  profilePicture: string;
  username: string;
}

interface ConversationState {
  conversations: Conversation[];
  selectedConversation: ConversationUser | null;
  messages: Message[];
  conversationStatus: Status;
  conversationUsers: ConversationUser[];
  conversationUserStatus: Status;
  messageStatus: Status;
}

const initialState: ConversationState = {
  conversations: [],
  selectedConversation: null,
  messages: [],
  conversationStatus: Status.IDLE,
  conversationUsers: [],
  conversationUserStatus: Status.IDLE,
  messageStatus: Status.IDLE,
};

const conversationSlice = createSlice({
  name: "conversation",
  initialState,
  reducers: {
    setConversations(state, action) {
      state.conversations = action.payload;
    },
    setSelectedConversation(state, action) {
      state.selectedConversation = action.payload;
      state.messages = [];
    },
    setMessages(state, action) {
      state.messages = action.payload;
    },
    setConversationStatus(state, action) {
      state.conversationStatus = action.payload;
    },
    setConversationUsers(state, action) {
      state.conversationUsers = action.payload;
    },
    setConversationUserStatus(state, action) {
      state.conversationStatus = action.payload;
    },
    setMessageStatus(state, action) {
      state.messageStatus = action.payload;
    },
  },
});

export const {
  setConversations,
  setSelectedConversation,
  setConversationUserStatus,
  setConversationUsers,
  setMessages,
  setMessageStatus,
  setConversationStatus,
} = conversationSlice.actions;
export default conversationSlice.reducer;

export const fetchConversationUsers = () => {
  return async (dispatch: Dispatch) => {
    dispatch(setConversationUserStatus(Status.LOADING));
    try {
      const { data } = await API.get("users");
      dispatch(setConversationUsers(data.data));
    } catch (error) {
      const errorMessage =
        error instanceof AxiosError && error.response?.data?.message
          ? error.response.data.message
          : "An error occurred. Please try again later.";
      toast.error(errorMessage);
    } finally {
      // dispatch(setConversationUserStatus(Status.IDLE));
    }
  };
};

export const fetchMessages = () => {
  return async (dispatch: Dispatch, getState: () => RootState) => {
    dispatch(setConversationStatus(Status.LOADING));
    const { selectedConversation } = getState().conversation;
    try {
      if (!selectedConversation?._id) return;
      const { data } = await API.get(`message/${selectedConversation._id}`);
      dispatch(setMessages(data.data));
    } catch (error) {
      const errorMessage =
        error instanceof AxiosError && error.response?.data?.message
          ? error.response.data.message
          : "An error occurred. Please try again later.";
      toast.error(errorMessage);
    } finally {
      dispatch(setConversationStatus(Status.IDLE));
    }
  };
};

export const sendMessage = (message: string) => {
  return async (dispatch: Dispatch, getState: () => RootState) => {
    dispatch(setMessageStatus(Status.LOADING));
    const { selectedConversation, messages } = getState().conversation;
    try {
      const { data } = await API.post(
        `message/send/${selectedConversation?._id}`,
        {
          message,
        }
      );
      dispatch(setMessages([...messages, data.data]));
    } catch (error) {
      const errorMessage =
        error instanceof AxiosError && error.response?.data?.message
          ? error.response.data.message
          : "An error occurred. Please try again later.";
      toast.error(errorMessage);
    } finally {
      dispatch(setMessageStatus(Status.IDLE));
    }
  };
};
