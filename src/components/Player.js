import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faAngleLeft, faAngleRight, faPause } from '@fortawesome/free-solid-svg-icons';
import { useEffect } from 'react';
import { playAudio } from '../utils';

function Player({
  audioRef,
  isPlaying,
  setIsPlaying,
  songInfo,
  setSongInfo,
  currentSong,
  songs,
  setSongs,
  setCurrentSong,
}) {
  useEffect(() => {
    const newSongs = songs.map((song) => {
      if (song.id === currentSong.id) {
        return {
          ...song,
          active: true,
        };
      } else {
        return {
          ...song,
          active: false,
        };
      }
    });
    setSongs(newSongs);
  }, [currentSong]);

  const playSongHeader = () => {
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(!isPlaying);
    } else {
      audioRef.current.play();
      setIsPlaying(!isPlaying);
    }
  };

  const skipTrackHandler = (direction) => {
    let currentIndex = songs.findIndex((song) => song.id === currentSong.id);

    if (direction === 'skip-forward') {
      setCurrentSong(songs[(currentIndex + 1) % songs.length]);
    }
    if (direction === 'skip-back') {
      if ((currentIndex - 1) % songs.length === -1) {
        setCurrentSong(songs[songs.length - 1]);
        playAudio(isPlaying, audioRef);
        return;
      }
      setCurrentSong(songs[(currentIndex - 1) % songs.length]);
    }
    playAudio(isPlaying, audioRef);
  };

  function getTime(time) {
    return Math.floor(time / 60) + ':' + ('0' + Math.floor(time % 60)).slice(-2);
  }

  const dragHandler = (e) => {
    audioRef.current.currentTime = e.target.value;
    setSongInfo({ ...songInfo, currentTime: e.target.value });
  };

  return (
    <div className="player">
      <div className="time-control">
        <p>{getTime(songInfo.currentTime)}</p>
        <input
          type="range"
          value={songInfo.currentTime}
          max={songInfo.duration || 0}
          min={0}
          onChange={dragHandler}
          style={{
            background: `linear-gradient(to right,${currentSong.color[0]},${currentSong.color[1]} )`,
          }}
        />
        <p>{songInfo.duration ? getTime(songInfo.duration) : '0:00'}</p>
        <p>{getTime(songInfo.duration)}</p>
      </div>
      <div className="play-control">
        <FontAwesomeIcon
          onClick={() => skipTrackHandler('skip-back')}
          className="skip-button"
          size="2x"
          icon={faAngleLeft}
          color="white"
        />
        <FontAwesomeIcon
          onClick={playSongHeader}
          className="play"
          size="2x"
          color="white"
          icon={isPlaying ? faPause : faPlay}
        />
        <FontAwesomeIcon
          className="skip-forward"
          size="2x"
          icon={faAngleRight}
          color="white"
          onClick={() => skipTrackHandler('skip-forward')}
        />
      </div>
    </div>
  );
}

export default Player;
