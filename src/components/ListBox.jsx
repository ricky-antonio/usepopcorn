import { useState } from "react";
import MovieList from "./MovieList";

const ListBox = ({movies}) => {
        const [isListOpen, setIsListOpen] = useState(true);
    

    return (
        <div className="box">
            <button
                className="btn-toggle"
                onClick={() => setIsListOpen((open) => !open)}
            >
                {isListOpen ? "–" : "+"}
            </button>
            {isListOpen && (
                <MovieList movies={movies} />
            )}
        </div>
    );
};

export default ListBox;
