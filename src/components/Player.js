import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faAngleLeft, faAngleRight, faPause } from '@fortawesome/free-solid-svg-icons';

function Player({ audioRef, isPlaying, setIsPlaying, songInfo, setSongInfo }) {
  const playSongHeader = () => {
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(!isPlaying);
    } else {
      audioRef.current.play();
      setIsPlaying(!isPlaying);
    }
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
        <p>Start Time</p>
        <p>{getTime(songInfo.currentTime)}</p>
        <input type="range" value={songInfo.currentTime} max={songInfo.duration || 0} min={0} onChange={dragHandler} />
        <p>End Time</p>
        <p>{getTime(songInfo.duration)}</p>
      </div>
      <div className="play-control">
        <FontAwesomeIcon className="skip-button" size="2x" icon={faAngleLeft} color="white" />
        <FontAwesomeIcon onClick={playSongHeader} className="play" size="2x" color="white" icon={isPlaying ? faPause : faPlay} />
        <FontAwesomeIcon className="skip-forward" size="2x" icon={faAngleRight} color="white" />
      </div>
    </div>
  );
}

export default Player;
