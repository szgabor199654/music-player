import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMusic } from "@fortawesome/free-solid-svg-icons";
import { useAppContext } from "../App";

export const Nav = () => {
  const { setLibraryStatus, libraryStatus } = useAppContext();
  return (
    <nav>
      <h1>Music Player</h1>
      <button onClick={() => setLibraryStatus(!libraryStatus)}>
        Library
        <FontAwesomeIcon icon={faMusic} />
      </button>
    </nav>
  );
};
