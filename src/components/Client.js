import React from 'react';
import Avatar from 'react-avatar';
const Client = ({username}) => {
  return (
    <div className='client'>
        <Avatar name={username} size={35} round ="10px"/>
        <span className='username'>{username}</span>
    </div>
  );
};

export default Client;