import WatchedMovie from "./WatchedMovie";

const WatchedList = ({ watched, onDeleteMovie }) => {
    return (
        <ul className="list">
            {watched.map((movie) => (
                <WatchedMovie movie={movie} key={movie.imdbID} onDeleteMovie={onDeleteMovie} />
            ))}
        </ul>
    );
};

export default WatchedList;
