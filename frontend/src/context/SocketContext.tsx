import SocketIoClient from "socket.io-client";
import { createContext , useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ws_Server = "http://localhost:5000";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const SocketContext = createContext<any | null>(null);

const socket = SocketIoClient(ws_Server, {
  withCredentials: false,
  transports: ["polling", "websocket"],
})

interface Props {
  children: React.ReactNode;
}

export const SocketProvider: React.FC<Props> = ({ children }) => {

  const navigate = useNavigate(); // handle navigation with programatinglly 
  useEffect(() => {

    const enterRoom = ({roomId} : {roomId : string}) => {

      navigate(`/room/${roomId}`);

    }

    socket.on("room-created", enterRoom);

  }, []);


  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketContext;
