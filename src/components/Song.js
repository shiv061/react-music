import React from 'react';

function Song({ currentSong, setLibraryStatus }) {
  return (
    <div className="song-container" onClick={() => setLibraryStatus(false)}>
      <img src={currentSong.cover} alt="" />
      <h2>{currentSong.name}</h2>
      <h3>{currentSong.artist}</h3>
    </div>
  );
}

export default Song;
