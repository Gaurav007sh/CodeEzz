import React, { useState, useRef, useEffect } from "react";
import ACTIONS from "../Actions";
import Client from "../components/Client";
import Editor from "../components/Editor";
import { initSocket } from "../socket";
import { useLocation, useNavigate, Navigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
// import userEvent from "@testing-library/user-event";
const Edit = () => {
  const socketRef = useRef(null);
  const location = useLocation();
  const {roomId} = useParams();
  const reactNavigator = useNavigate();
  const[clients,setClients] = useState([]);
  const codeRef = useRef(null);
  useEffect(() => {
    const init = async() => {
      socketRef.current = await initSocket();
      socketRef.current.on('connect_error', (err) => handleErrors(err));
      socketRef.current.on('connect_failed', (err) => handleErrors(err));

      function handleErrors(e) {
        console.log('socket_error',e);
        toast.error('Socket connection failed, try again later.');
        reactNavigator('/');
      }

      socketRef.current.emit(ACTIONS.JOIN, {
        roomId,
        username: location.state.username,
      });

      socketRef.current.on(ACTIONS.JOINED, 
        ({clients,username,socketId}) => {
          if(username!== location.state.username){            // mera UI safe rhega isse, baaki sb k UI m notify kro  
            toast.success(`${username} joined the room.`);
          }
          setClients(clients);
          socketRef.current.emit(ACTIONS.SYNC_CODE, {
            code: codeRef.current,
            socketId,
          });
      });

      socketRef.current.on(ACTIONS.DISCONNECTED, ({socketId, username}) => {
        toast.success(`${username} left the room. `);
        setClients((prev) => {
          return prev.filter(client => client.socketId !== socketId);
        });
      });
    };
    init();
    return () => {
      socketRef.current.disconnect();
      socketRef.current.off(ACTIONS.JOINED);
      socketRef.current.off(ACTIONS.DISCONNECTED);
    };
  },[]);
  const {roomID} = useParams();
  async function copyroomId()
  {
    try{
      await navigator.clipboard.writeText(roomID);
      toast.success('Room ID has been copied successfully');
    }catch(err){
      toast.error('Could not copy Room ID ');
      console.error(err);
    }
  }

  function leaveRoom()
  {
    reactNavigator('/');
  }
  // const[clients,setClients] = useState([
  //   {socketId : 1,username: 'Rakesh k'},
  //   {socketId : 2,username: 'sunil huehue'},
  //   {socketId : 3,username: 'bamkhilesh sir'},
  // ]);

  if(!location.state){
    return <Navigate to = "/"/>;
  }

  return <div className="mainWrap">
    <div className="aside">
      <div className="asideInner">
        <div className="editLogo">
          <img className="logoImage" src="" alt="bada logo"/>
          <h3>Connected</h3>
          <div className="clientsList">
            {
              clients.map((client) => (
                <Client key = {client.socketId} username = {client.username}/>
            ))}
          </div>
        </div>
      </div>
      <button onClick={copyroomId} className='btn copyBtn' >COPY ROOM ID</button>
      <button onClick={leaveRoom} className='btn leaveBtn' >LEAVE</button>
    </div>
    <div className="editWrap">
      <Editor socketRef={socketRef} roomId={roomId} onCodeChange={(code) => {
          codeRef.current=code;
        }} 
      />
    </div>
  </div>;
};

export default Edit;