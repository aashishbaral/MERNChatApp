import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSocket } from "../context/SocketContext";
import { setMessages } from "../redux/conversationSlice";
import { useAppSelector } from "../redux/hooks";

const useMessageListen = () => {
  const { socket } = useSocket();
  const dispatch = useDispatch();
  const { messages } = useAppSelector((state) => state.conversation);

  useEffect(() => {
    if (socket) {
      socket.on("newMessage", (message) => {
        dispatch(setMessages([...messages, message]));
      });
    }

    return () => {
      socket?.off("newMessage");
    };
  }, [messages, socket, dispatch, setMessages]);
};

export default useMessageListen;
