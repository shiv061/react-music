import React from 'react';

function LibrarySong({ name, artist, cover, id, setCurrentSong, songs, audioRef, isPlaying }) {
  const songSelectHandler = () => {
    const selectedSong = songs.filter((state) => state.id === id);
    setCurrentSong(selectedSong[0]);
    if (isPlaying) {
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise.then((audio) => audioRef.current.play()).catch((err) => console.log(err));
      }
    }
  };
  return (
    <div className="library-song" onClick={songSelectHandler}>
      <img src={cover} alt="" />
      <div className="song-description">
        <h3>{name}</h3>
        <h4>{artist}</h4>
      </div>
    </div>
  );
}

export default LibrarySong;
