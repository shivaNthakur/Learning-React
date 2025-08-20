import React from "react";
import { UNSAFE_withComponentProps } from "react-router-dom";

export default function Button ({
    children,
    type = "button",
    bgColor = "bg-blue-600",
    textColor = "text-white",
    className = "",
    ...props
}) {
    return (
        <button className= {`px-4 py-2 rounded-lg ${bgColor} ${textColor} ${className}`} {...props}>
            {children}
        </button>
    )
}

// children is the text shown on button
// props if user pass some addtional properties