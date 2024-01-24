//Adding Components

import { useState, useRef, createContext, useContext } from "react";
import Player from "./components/Player";
import Song from "./components/Song";
import "./styles/app.scss";
import data from "./data";
import Library from "./components/Library";
import { Nav } from "./components/Nav";
import { playAudio } from "./util";
const Context = createContext();

function App() {
  const audioRef = useRef(null);
  //State
  const [songs, setSongs] = useState(data());
  const [currentSong, setCurrentSong] = useState(songs[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [songInfo, setSongInfo] = useState({
    currentTime: 0,
    duration: 0,
  });
  const [libraryStatus, setLibraryStatus] = useState(false);

  const activeLibraryHandler = (nextPrev) => {
    const newSongs = songs.map((s) => {
      if (s.id === nextPrev.id) {
        return {
          ...s,
          active: true,
        };
      } else {
        return {
          ...s,
          active: false,
        };
      }
    });
    setSongs(newSongs);
  };
  const skipTrackHandler = (direction) => {
    let currentIndex = songs.findIndex((song) => song.id === currentSong.id);
    if (direction === "skip-forward") {
      setCurrentSong(songs[currentIndex + 1] || songs[0]);
      activeLibraryHandler(songs[currentIndex + 1] || songs[0]);
    }
    if (direction === "skip-back") {
      setCurrentSong(songs[currentIndex - 1] || songs[songs.length - 1]);
      activeLibraryHandler(songs[currentIndex - 1] || songs[songs.length - 1]);
    }
    playAudio(isPlaying, audioRef);
  };

  const timeUpdateHandler = (e) => {
    const current = e.target.currentTime;
    const duration = e.target.duration;
    setSongInfo({ ...songInfo, currentTime: current, duration });
  };
  return (
    <Context.Provider
      value={{
        audioRef,
        currentSong,
        isPlaying,
        setIsPlaying,
        songs,
        setCurrentSong,
        setSongs,
        songInfo,
        setSongInfo,
        skipTrackHandler,
        libraryStatus,
        setLibraryStatus,
      }}
    >
      <div className={`App ${libraryStatus ? "library-active" : ""}`}>
        <Nav />
        <Song />
        <Player />
        <Library />
        <audio
          onTimeUpdate={timeUpdateHandler}
          onLoadedMetadata={timeUpdateHandler}
          ref={audioRef}
          src={currentSong.audio}
          onEnded={() => skipTrackHandler("skip-forward")}
        ></audio>
      </div>
    </Context.Provider>
  );
}
export const useAppContext = () => useContext(Context);

export default App;
