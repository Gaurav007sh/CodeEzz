import React, { useState } from 'react'
import {v4 as uuidV4} from 'uuid';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';    
// import { useState } from 'react';
const Home = () => {

    const navigate = useNavigate();

    const [roomId, setRoomId] = useState('');
    const [username, setUsername] = useState('');
    const createNewRoom = (e) => {
        e.preventDefault();
        const id = uuidV4();
        setRoomId(id);
        toast.success('Created a new room');
    };

    const joinRoom = () => {
        if(!roomId || !username)
        {
            toast.error('Room Id & username required')
            return;
        }

        navigate(`/editor/${roomId}`,{
            state: {
                username,
            },
        });
    };

    const handelEnter = (e) =>{
        if(e.code=='Enter'){
            joinRoom();
        }
    }

    return(
        <div className="homePageWrapper">
            <div className="formWrapper">
                <img className="homePageLogo" src="logo.png" alt="chota logo"/>
                <h4 className="mainLable">Paste invitation room ID</h4>
                <div className="inputGroup">
                    <input 
                        type="text"

                        className="inputBox"

                        placeholder="ROOM ID"

                        onChange={(e)=> setRoomId(e.target.value)}

                        value={roomId}

                        onKeyUp={handelEnter}

                    />
                    <input 
                        type="text"

                        className="inputBox"

                        placeholder="USERNAME"

                        onChange={(e)=> setUsername(e.target.value)}

                        value={username}

                        onKeyUp={handelEnter}
                    />
                    <button className="btn joinbtn" onClick={joinRoom}>Join</button>

                    <span className="createInfo">
                        If you don't have an invite then create &nbsp;
                        <a onClick={createNewRoom} href="" className="createNewBtn">
                            New room
                        </a>
                    </span>
                </div>
            </div>
            <footer className='footer'>
                <h4>Build with 🧡 by &nbsp;<a href='https://www.linkedin.com/in/gaurav-sharma-57619323a/'>CodeEzz Team</a> </h4>
            </footer>
        </div>
    );
};

export default Home;
