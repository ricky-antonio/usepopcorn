import { useState, useEffect } from "react";
import NavBar from "./components/Navbar";
import Main from "./components/Main";
import Logo from "./components/Logo";
import NumResults from "./components/NumResults";
import Search from "./components/Search";
import ListBox from "./components/ListBox";
import MovieList from "./components/MovieList";
import WatchedSummary from "./components/WatchedSummary";
import WatchedList from "./components/WatchedList";
import Loader from "./components/Loader";
import ErrorMessage from "./components/ErrorMessage";
import MovieDetails from "./components/MovieDetails";
import data from "./data";

const OMDB_API_KEY = import.meta.env.VITE_OMDB_API_KEY;

const App = () => {
    const [movies, setMovies] = useState([]);
    const [watched, setWatched] = useState(data);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [query, setQuery] = useState("");
    const [selectedId, setSelectedId] = useState(null);

    useEffect(() => {
        const controller = new AbortController();

        const fetchMovies = async () => {
            try {
                setIsLoading(true);
                setError("");
                const res = await fetch(
                    `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${query}`,
                    { signal: controller.signal }
                );

                if (!res.ok)
                    throw new Error(
                        "Something went wrong with fetching movies"
                    );

                const data = await res.json();
                if (data.Response === "False")
                    throw new Error("Movie not found");

                setMovies(data.Search);
                setError("");
            } catch (err) {
                console.error(err.message);
                if (err.name !== "AbortError") {
                    setError(err.message);
                }
            } finally {
                setIsLoading(false);
            }
        };

        if (query.length < 3) {
            setMovies([]);
            setError("");
            return;
        }

        handleCloseMovie();
        fetchMovies();

        return () => {
            controller.abort();
        };
    }, [query, watched]);

    function onSelectMovie(movieId) {
        movieId === selectedId ? setSelectedId(null) : setSelectedId(movieId);
    }

    function handleCloseMovie() {
        setSelectedId(null);
    }

    function handleAddMovie(newMovie) {
        setWatched((watchedMovies) => [...watchedMovies, newMovie]);
    }

    function handleDeleteMovie(movieId) {
        setWatched((watchedMovies) =>
            watchedMovies.filter((movie) => movie.imdbID !== movieId)
        );
    }

    return (
        <>
            <NavBar>
                <Logo />
                <Search query={query} setQuery={setQuery} />
                <NumResults movies={movies} />
            </NavBar>

            <Main>
                <ListBox>
                    {isLoading && <Loader />}
                    {!isLoading && !error && (
                        <MovieList
                            movies={movies}
                            onSelectMovie={onSelectMovie}
                            onCloseMovie={handleCloseMovie}
                        />
                    )}
                    {error && <ErrorMessage message={error} />}
                </ListBox>

                <ListBox>
                    {selectedId ? (
                        <MovieDetails
                            selectedId={selectedId}
                            onCloseMovie={handleCloseMovie}
                            OMDB_API_KEY={OMDB_API_KEY}
                            onAddMovie={handleAddMovie}
                            watched={watched}
                            key={selectedId}
                        />
                    ) : (
                        <>
                            <WatchedSummary watched={watched} />
                            <WatchedList
                                watched={watched}
                                onDeleteMovie={handleDeleteMovie}
                            />
                        </>
                    )}
                </ListBox>
            </Main>
        </>
    );
};

export default App;
