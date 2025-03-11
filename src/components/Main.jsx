import ListBox from "./ListBox";
import WatchedBox from "./WatchedBox";

const Main = ({ movies, watched }) => {
    return (
        <main className="main">
            <ListBox movies={movies} />

            <WatchedBox watched={watched} />
        </main>
    );
};

export default Main;
