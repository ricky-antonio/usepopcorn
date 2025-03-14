import { useEffect, useState } from "react";
import StarRating from "./StarRating";
import Loader from "./Loader";

const tempMovie = {
    Title: "The Matrix",
    Year: "1999",
    Rated: "R",
    Released: "31 Mar 1999",
    Runtime: "136 min",
    Genre: "Action, Sci-Fi",
    Director: "Lana Wachowski, Lilly Wachowski",
    Writer: "Lilly Wachowski, Lana Wachowski",
    Actors: "Keanu Reeves, Laurence Fishburne, Carrie-Anne Moss",
    Plot: "When a beautiful stranger leads computer hacker Neo to a forbidding underworld, he discovers the shocking truth--the life he knows is the elaborate deception of an evil cyber-intelligence.",
    Language: "English",
    Country: "United States, Australia",
    Awards: "Won 4 Oscars. 42 wins & 52 nominations total",
    Poster: "https://m.media-amazon.com/images/M/MV5BN2NmN2VhMTQtMDNiOS00NDlhLTliMjgtODE2ZTY0ODQyNDRhXkEyXkFqcGc@._V1_SX300.jpg",
    Ratings: [
        {
            Source: "Internet Movie Database",
            Value: "8.7/10",
        },
        {
            Source: "Rotten Tomatoes",
            Value: "83%",
        },
        {
            Source: "Metacritic",
            Value: "73/100",
        },
    ],
    Metascore: "73",
    imdbRating: "8.7",
    imdbVotes: "2,124,695",
    imdbID: "tt0133093",
    Type: "movie",
    DVD: "N/A",
    BoxOffice: "$172,076,928",
    Production: "N/A",
    Website: "N/A",
    Response: "True",
};

const MovieDetails = ({ selectedId, onCloseMovie, OMDB_API_KEY }) => {
    const [movie, setMovie] = useState(tempMovie);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const {
        Title: title,
        Year: year,
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

    return (
        <div className="details">
            {isLoading ? (
                <Loader />
            ) : (
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
                            <StarRating maxRating={10} size={24} />
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
