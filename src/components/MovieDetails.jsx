import { useEffect, useState } from "react";
import StarRating from "./StarRating";
import Loader from "./Loader";
import ErrorMessage from "./ErrorMessage";

const MovieDetails = ({
    selectedId,
    onCloseMovie,
    OMDB_API_KEY,
    onAddMovie,
    watched,
}) => {
    const [movie, setMovie] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [userRating, setUserRating] = useState(null);

    const previousUserRating = watched.find(
        (movie) => movie.imdbID === selectedId
    )?.userRating;

    const {
        Title: title,
        // Year: year,
        Poster: poster,
        Runtime: runtime,
        imdbRating,
        Plot: plot,
        Released: released,
        Actors: actors,
        Director: director,
        Genre: genre,
    } = movie;

    useEffect(() => {
        const getMovieDetails = async () => {
            try {
                setIsLoading(true);
                setError("");
                const res = await fetch(
                    `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&i=${selectedId}`
                );

                if (!res.ok)
                    throw new Error(
                        "Something went wrong with fetching movies"
                    );

                const data = await res.json();

                if (data.Response === "False")
                    throw new Error("Movie not found");
                setMovie(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        };
        getMovieDetails();
    }, [selectedId]);

    useEffect(() => {
        if (!title) return;
        document.title = `Title | ${title}`;

        return () => {
            document.title = "usePopcorn";
        };
    }, [title]);

    useEffect(() => {
        const callback = (e) => {
            if (e.code === "Escape") {
                onCloseMovie();
            }
        };

        document.addEventListener("keydown", callback);
        return () => {
            document.removeEventListener("keydown", callback);
        };
    }, [onCloseMovie]);

    function handleAddWatchedMovie() {
        onAddMovie({
            ...movie,
            userRating: userRating,
            runtime: runtime.split(" ")[0],
        });
    }

    return (
        <div className="details">
            {error && <ErrorMessage message={error} />}
            {isLoading && <Loader />}
            {!isLoading && !error && (
                <>
                    <header>
                        <button className="btn-back" onClick={onCloseMovie}>
                            &larr;
                        </button>
                        <img src={poster} alt={`poster of ${title}`} />
                        <div className="details-overview">
                            <h2>{title}</h2>
                            <p>
                                {released} &bull; {runtime}
                            </p>
                            <p>{genre}</p>
                            <p>
                                <span>⭐</span> {imdbRating} IMDb rating
                            </p>
                        </div>
                    </header>

                    <section>
                        <div className="rating">
                            {!previousUserRating ? (
                                <>
                                    <StarRating
                                        maxRating={10}
                                        size={24}
                                        onSetRating={setUserRating}
                                    />
                                    {userRating && (
                                        <>
                                            <button
                                                className="btn-add"
                                                onClick={handleAddWatchedMovie}
                                            >
                                                Add to watched list +
                                            </button>
                                        </>
                                    )}
                                </>
                            ) : (
                                <>
                                    <p>{`You rated this movie ${previousUserRating} ⭐`}</p>
                                </>
                            )}
                        </div>
                        <p>
                            <em>{plot}</em>
                        </p>
                        <p>Starring {actors}</p>
                        <p>Directed by {director}</p>
                    </section>
                </>
            )}
        </div>
    );
};

export default MovieDetails;
