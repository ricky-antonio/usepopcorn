import { useState } from "react";
import WatchedSummary from "./WatchedSummary";
import WatchedList from "./WatchedList";

const WatchedBox = ({ watched }) => {
    const [isWatchedOpen, setIsWatchedOpen] = useState(true);

    return (
        <div className="box">
            <button
                className="btn-toggle"
                onClick={() => setIsWatchedOpen((open) => !open)}
            >
                {isWatchedOpen ? "–" : "+"}
            </button>
            {isWatchedOpen && (
                <>
                    <WatchedSummary watched={watched} />

                    <WatchedList watched={watched} />
                </>
            )}
        </div>
    );
};

export default WatchedBox;
