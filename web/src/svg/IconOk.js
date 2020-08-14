import React from 'react';

export const IconOk = props => {
    const {size = '100%', style = {}, color = null} = props
    return (
        <svg
            style={style}
            height={size}
            width={size}
            fill={color || "currentColor"}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 515.556 515.556"
            xmlnsXlink="http://www.w3.org/1999/xlink"
        >
            <path d="m0 274.226 176.549 176.886 339.007-338.672-48.67-47.997-290.337 290-128.553-128.552z"/>
        </svg>
    )
}