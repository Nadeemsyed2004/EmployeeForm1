import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function DetailsButton({child,to}) {
    const [focus, setFocus] = useState(false);

    const navigate = useNavigate();

    return (
        <div>
            <button
                onClick={() => navigate(to)}
                style={focus ? buttonStyle : nonButtonStyle}
                onMouseEnter={() => setFocus(true)} // Wrap setFocus in a function
                onMouseLeave={() => setFocus(false)} // Optionally handle blur to reset focus
            >
                {child}
            </button>
        </div>
    );
}

const buttonStyle = {
    background: '#42a4ed',
    cursor: 'pointer',
    color: 'white',
    borderRadius: '10px',
    width: '100px',
    height: '30px',
};

const nonButtonStyle = {
    background: '#0988e8',
    cursor: 'pointer',
    color: 'white',
    borderRadius: '10px',
    width: '100px',
    height: '30px',
};

export default DetailsButton;
