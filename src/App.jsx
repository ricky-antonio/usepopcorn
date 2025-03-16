import { useState } from "react";
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
import { useMovies } from "./useMovies";
import { useLocalStorageState } from "./useLocalStorageState";

const OMDB_API_KEY = import.meta.env.VITE_OMDB_API_KEY;

const App = () => {
    const [query, setQuery] = useState("");
    const [selectedId, setSelectedId] = useState(null);
    const [watched, setWatched] = useLocalStorageState(data, "watched");

    const { movies, isLoading, error } = useMovies(
        query,
        OMDB_API_KEY,
        handleCloseMovie
    );

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
