import React from 'react'

const STATE_STYLE = {
    0: "bg-yellow-50",
    1: "bg-green-100",
    2: "bg-red-50 text-red-700",
    3: "bg-gray-50 text-gray-700"
}

const BadgeSatateProperty = ({ stateId, state }) => {
    return (
        <span
            className={`${
                STATE_STYLE[stateId] || ""
            } py-0.1 px-2 rounded-full text-sm`}
        >
            {state}
        </span>
    );
};  

export default BadgeSatateProperty