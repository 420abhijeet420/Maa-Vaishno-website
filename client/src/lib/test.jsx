import React from 'react';
import ReactPlayer from 'react-player';

export default function TestPlayer() {
  return (
    <div 
      style={{
        width: '960px',
        height: '540px',
        margin: '50px auto',
        background: '#000',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <ReactPlayer
        url="https://www.youtube.com/watch?v=WpW36ldAqnM"
        controls
        width="100%"
        height="100%"
      />
    </div>
  );
}
