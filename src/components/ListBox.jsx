import { useState } from "react";

const ListBox = ({ children }) => {
    const [isListOpen, setIsListOpen] = useState(true);

    return (
        <div className="box">
            <button
                className="btn-toggle"
                onClick={() => setIsListOpen((open) => !open)}
            >
                {isListOpen ? "–" : "+"}
            </button>
            {isListOpen && children}
        </div>
    );
};

export default ListBox;
