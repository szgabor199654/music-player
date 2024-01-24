import { useAppContext } from "../App";
import LibrarySong from "./LibrarySong";

const Library = () => {
  const {
    audioRef,
    isPlaying,
    songs,
    setCurrentSong,
    setSongs,
    libraryStatus,
  } = useAppContext();
  return (
    <div className={`library ${libraryStatus ? "active-library" : ""}`}>
      <h2>Library</h2>
      <div className="library-songs">
        {songs.map((song) => (
          <LibrarySong
            setSongs={setSongs}
            song={song}
            songs={songs}
            isPlaying={isPlaying}
            key={song.id}
            setCurrentSong={setCurrentSong}
            audioRef={audioRef}
          />
        ))}
      </div>
    </div>
  );
};

export default Library;
