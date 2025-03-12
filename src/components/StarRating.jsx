import { useState } from "react";
import Star from "./Star";
import PropTypes from "prop-types";

const containerStyle = {
    display: "flex",
    alignItems: "center",
    gap: "16px",
};

const starContainerStyle = {
    display: "flex",
};

const StarRating = ({
    maxRating = 5,
    color = "#FCC419",
    size = 48,
    className = "",
    defaultRating = 0,
    onSetRating = () => {}
}) => {
    const [rating, setRating] = useState(defaultRating);
    const [hoverRating, setHoverRating] = useState(0);

    const textStyle = {
        lineHeight: "1",
        margin: "0",
        color: color,
        fontSize: `${size / 1.5}px`,
    };

    function handleRating(rating) {
        setRating(rating);
        onSetRating(rating);
    }

    return (
        <div style={containerStyle} className={className}>
            <div style={starContainerStyle}>
                {Array.from({ length: maxRating }, (_, i) => (
                    <Star
                        key={i}
                        full={
                            hoverRating ? hoverRating >= i + 1 : rating >= i + 1
                        }
                        onRate={() => handleRating(i + 1)}
                        onHoverIn={() => setHoverRating(i + 1)}
                        onHoverOut={() => setHoverRating(0)}
                        color={color}
                        size={size}
                    />
                ))}
            </div>
            <p style={textStyle}>{hoverRating || rating || ""}</p>
        </div>
    );
};

StarRating.propTypes = {
    maxRating: PropTypes.number,
    color: PropTypes.string,
    size: PropTypes.number,
    className: PropTypes.string,
    defaultRating: PropTypes.number,
    onSetRating: PropTypes.func
}

export default StarRating;
